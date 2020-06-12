import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1591454473333 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        comment: "The hash of the user's password",
                        isNullable: false,
                    },
                    {
                        name: "rounds",
                        type: "int",
                        comment:
                            "Number of rounds the iterated hash algorithm has to apply to get the password hash",
                        isNullable: false,
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        isNullable: false,
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                ],
                indices: [
                    {
                        isUnique: true,
                        columnNames: ["email"],
                    },
                    {
                        name: "full_name_idx",
                        columnNames: ["first_name", "last_name"],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.dropTable("users");
    }
}
