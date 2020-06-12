/**
 * JSON representation of a link.
 */
export interface HateoasLink {
    /**
     * The Link's URI.
     */
    href: string;
    /**
     * A secondary key for selecting Link Objects
     * which share the same relation type
     */
    name?: string;
    /**
     * The media type of the `href` when dereferencing.
     */
    type?: string;
    /**
     * A human-readable identifier of the link.
     */
    title?: string;
    /**
     * HTTP method to use when dereferencing the link.
     */
    method?: string;
    /**
     * A URI that hints about the profile (as
     * defined by https://tools.ietf.org/html/draft-wilde-profile-link-04) of the target resource.
     */
    profile?: string;
    /**
     * Indicates the language of the target resource as defined by the
     * https://tools.ietf.org/html/rfc5988 specification.
     */
    hreflang?: string;
    /**
     * True if the `href` is a URI template.
     */
    templated?: boolean;
    /**
     * True if the link is deprecated.
     */
    deprecation?: boolean;
}

/**
 * JSON representation of a model.
 */
export interface HateoasJsonModel {
    [key: string]: unknown;
    /**
     * Model links.
     */
    _links?: Record<string, HateoasLink | HateoasLink[]>;
    /**
     * Embedded models.
     */
    _embedded?: Record<string, HateoasJsonModel | HateoasJsonModel[]>;
}
