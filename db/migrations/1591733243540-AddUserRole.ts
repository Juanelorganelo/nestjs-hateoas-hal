import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddUserRole1591733243540 implements MigrationInterface {
    private readonly roleForeignKey = new TableForeignKey({
        columnNames: ["role"],
        referencedTableName: "roles",
        referencedColumnNames: ["id"],
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "role",
                type: "int",
                isNullable: false,
            }),
        );
        return queryRunner.createForeignKey("users", this.roleForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.dropForeignKey("users", this.roleForeignKey);
    }
}
