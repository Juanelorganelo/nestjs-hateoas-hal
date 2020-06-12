import { Controller, Get, Param } from "@nestjs/common";
import { UserModel } from "./UserModel";

/**
 * Controller for user related resources.
 */
@Controller("users")
export class UsersController {
    /**
     * Find a user by id.
     *
     * @param id The user's id.
     * @returns A RESTful representation of the user.
     */
    @Get("/:id")
    public find(@Param("id") id: number): UserModel {
        return new UserModel({
            id,
            firstName: "Juan Manuel",
            lastName: "Garcia Junco",
            email: "cokenrocknroll@gmail.com",
            createdAt: new Date(),
        });
    }
}
