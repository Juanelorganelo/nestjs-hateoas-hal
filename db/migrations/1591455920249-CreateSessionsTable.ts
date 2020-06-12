import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSessionsTable1591455920249 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.createTable(
            new Table({
                name: "sessions",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                    },
                    {
                        name: "token",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "device_fingerprint",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "device_ipv4",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "device_ipv6",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "user_id",
                        type: "int",
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
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "cascade",
                        onUpdate: "cascade",
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.dropTable("sessions");
    }
}
