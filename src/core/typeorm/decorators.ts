/* eslint-disable @typescript-eslint/no-explicit-any */
import { BeforeInsert, BeforeUpdate, Entity } from "typeorm";
import { validateOrReject } from "class-validator";

/**
 * Defines a TypeORM entity to be validated on saves an updates.
 */
export function ValidatedEntity(): (target: any) => any {
    return (Constructor: any) => {
        /**
         * A TypeORM entity with validation.
         */
        @Entity()
        class Validated extends Constructor {
            @BeforeInsert()
            @BeforeUpdate()
            public async validate(): Promise<void> {
                await validateOrReject(this);
            }
        }
        return Validated;
    };
}
