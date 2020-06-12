/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import qs from "querystring";
import isEmpty from "lodash/isEmpty";
import { RequestMethod } from "@nestjs/common";
import { Type } from "@core/interfaces";
import { HashMap } from "@app/core/dataStructures/HashMap";
import { HOST_METADATA, METHOD_METADATA, PATH_METADATA } from "@core/hateoas/constants";
import { HateoasLink, HateoasJsonModel } from "./interfaces";

const PARAMS_REGEXP = /:([a-zA-Z0-9]+)/g;
const PARAMS_REGEXP_FOR_TEST = new RegExp(PARAMS_REGEXP.source);

/**
 * Remove trailing slashes on a string.
 *
 * @ignore
 * @param value Value to trim.
 * @returns A copy of `value` without trailing slashes.
 */
function trimSlashes(value: string): string {
    return value.replace(/^\/+|\/+$/g, "");
}

/**
 * Serialize an object to a JSON object.
 *
 * @ignore
 * @param object Object to serialize.
 * @param blacklist List of properties to omit.
 * @returns JSON object.
 */
function serialize<T>(object: T, blacklist: string[] = []): Record<string, Partial<T[keyof T]>> {
    const serialized = Object.create(null);
    for (const [key, value] of Object.entries(object)) {
        if (typeof value !== "function" && !blacklist.includes(key)) {
            serialized[key] = value;
        }
    }
    return serialized;
}

/**
 * Options to create a link from a Controller method.
 */
export interface HateoasMethodOptions {
    /**
     * The link's relation.
     * Default's to the method name.
     */
    rel?: string;
    /**
     * Query parameters to add to the URL.
     */
    query?: Record<string, any>;
    /**
     * URL parameters to substitute in the URL.
     */
    params?: Record<string, any>;
    /**
     * Additional link attributes.
     */
    attributes?: Partial<HateoasLink>;
}

/**
 * A HATEOAS model representation.
 */
export abstract class HateoasModel<T extends HateoasModel = any> {
    /**
     * The current controller to get links from.
     */
    private controller: Type<any>;
    /**
     * Model links.
     */
    public readonly links = new HashMap<string, HateoasLink>();
    /**
     * Embedded models.
     */
    public readonly embedded = new HashMap<string, HateoasModel>();

    /**
     * Create a model instance.
     *
     * @param attributes A list of properties to assign to the model.
     */
    constructor(attributes?: Omit<T, keyof HateoasModel>) {
        if (attributes) {
            Object.assign(this, attributes);
        }
    }

    /**
     * Set the controller from which all subsequent links will be retrieved.
     *
     * @param controller The controller constructor.
     */
    public linkTo(controller: Type<any>) {
        this.controller = controller;
        return this;
    }

    /**
     * Add a link to the model.
     *
     * @param method The controller method responsible for handling the link.
     * @param options Method options.
     * @returns A link object.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    public method(method: Function, options?: HateoasMethodOptions): this {
        const link = this.createLink(method, options?.query, options?.params, options?.attributes);
        this.links.append(options?.rel ?? method.name, link);
        return this;
    }

    /**
     * Add an embedded model.
     *
     * @param rel Model relation.
     * @param model Model to add.
     * @returns The model instance.
     */
    public embed<U extends HateoasModel>(rel: string, model: U | U[]): this {
        this.embedded.append(rel, model);
        return this;
    }

    /**
     * Serialize the model to JSON.
     */
    public toJSON(): HateoasJsonModel {
        return {
            ...serialize(this, ["controller", "links", "embedded"]),
            _links: this.links.toJSON(),
            _embedded:
                this.embedded.size > 0 ? this.embedded.toJSON<HateoasJsonModel>() : undefined,
        };
    }

    /**
     * Create a HateoasJsonLink from metadata.
     */
    private createLink(
        // eslint-disable-next-line @typescript-eslint/ban-types
        method: Function,
        query?: Record<string, any>,
        params?: Record<string, any>,
        attributes?: Partial<HateoasLink>,
    ): HateoasLink {
        const hostMetadata = Reflect.getMetadata(HOST_METADATA, this.controller);
        const pathMetadata = Reflect.getMetadata(PATH_METADATA, method);
        const prefixMetadata = Reflect.getMetadata(PATH_METADATA, this.controller);

        let href = "";
        [hostMetadata, prefixMetadata, pathMetadata].forEach(metadata => {
            if (metadata) {
                href += `/${trimSlashes(metadata)}`;
            }
        });

        // Append query parameters if any.
        if (!isEmpty(query)) {
            href += `?${qs.stringify(query)}`;
        }

        let templated: boolean | undefined;
        // Check for URL params.
        if (PARAMS_REGEXP_FOR_TEST.test(href)) {
            // Get URL params names.
            const matches = href
                .match(PARAMS_REGEXP)!
                // Remove the colon at the beginning of the param.
                .map(match => [match, match.slice(1)]);

            // Try to replace URL params with values in the params object.
            if (params) {
                for (const [param, name] of matches) {
                    if (name in params) {
                        href = href.replace(param, params[name]);
                    }
                }
            }

            // If params are left after replacement treat the URI as a template.
            if (PARAMS_REGEXP_FOR_TEST.test(href)) {
                href = href.replace(PARAMS_REGEXP, "{$1}");
                templated = true;
            }
        }

        // Get the HTTP for the method with NestJS metadata.
        const requestMethod = Reflect.getMetadata(METHOD_METADATA, method);
        // Map the enum value to the string.
        const requestMethodName = RequestMethod[requestMethod];

        return {
            ...(attributes ?? {}),
            method: requestMethod !== RequestMethod.GET ? requestMethodName : undefined,
            href,
            templated,
        };
    }
}
