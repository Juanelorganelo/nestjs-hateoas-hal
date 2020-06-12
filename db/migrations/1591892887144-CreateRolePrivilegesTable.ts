import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRolePrivilegesTable1591892887144 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.createTable(
            new Table({
                name: "role_privileges",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                    },
                    {
                        name: "role_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "privilege_id",
                        type: "int",
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["role_id"],
                        referencedTableName: "roles",
                        referencedColumnNames: ["id"],
                        onDelete: "cascade",
                        onUpdate: "cascade",
                    },
                    {
                        columnNames: ["privilege_id"],
                        referencedTableName: "privileges",
                        referencedColumnNames: ["id"],
                        onDelete: "cascade",
                        onUpdate: "cascade",
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.dropTable("role_privileges");
    }
}
