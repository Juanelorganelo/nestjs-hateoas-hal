/* eslint-disable max-classes-per-file */
import { Controller, Get } from "@nestjs/common";
import { HateoasModel } from "@core/hateoas/HateoasModel";
import { HateoasLink } from "@app/core/hateoas/interfaces";

class TestModel extends HateoasModel<TestModel> {
    public id: number;
}

@Controller("test")
class TestController {
    @Get()
    public find(): any[] {
        return [];
    }
}

describe("#constructor", () => {
    test("constructs with no arguments", () => {
        expect(() => new TestModel()).not.toThrow();
    });

    test("assigns properties passed on the constructor", () => {
        const testModel = new TestModel({ id: 1 });
        expect(testModel.id).toBe(1);
    });
});

describe("#linkTo", () => {
    test("returns the model instance", () => {
        const testModel = new TestModel();
        expect(testModel.linkTo(TestController)).toBe(testModel);
    });
});

describe("#method", () => {
    test("throws if #linkTo hasn't been called", () => {
        const testModel = new TestModel();
        expect(() => testModel.method(TestController.prototype.find)).toThrow();
    });

    test("adds a link to the given controller method", () => {
        const testModel = new TestModel();
        testModel.method(TestController.prototype.find);

        // Link is added with the method's name by default.
        const link = testModel.links.get(TestController.prototype.find.name) as HateoasLink;
        expect(link.href).toBe("/test");
    });

    test("returns the model instance", () => {
        const testModel = new TestModel();
        expect(testModel.linkTo(TestController).method(TestController.prototype.find)).toBe(
            testModel,
        );
    });
});
