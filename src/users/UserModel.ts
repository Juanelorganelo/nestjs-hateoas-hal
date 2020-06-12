import { IsNumber, IsEmail, IsDate, IsString, MinLength, MaxLength } from "class-validator";
import { HateoasModel } from "@core/hateoas/HateoasModel";

/**
 * API representation of a user.
 */
export class UserModel extends HateoasModel<UserModel> {
    /**
     * The user's id.
     */
    @IsNumber()
    public id: number;

    /**
     * The user's email address.
     */
    @IsEmail()
    public email: string;

    /**
     * The date the user was created at.
     */
    @IsDate()
    public createdAt: Date;

    /**
     * The user's last name.
     */
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    public lastName: string;

    /**
     * The user's first name.
     */
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    public firstName: string;
}
