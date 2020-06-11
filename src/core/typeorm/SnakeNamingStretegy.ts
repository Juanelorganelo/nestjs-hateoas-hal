import { DefaultNamingStrategy, NamingStrategyInterface } from "typeorm";
import { snakeCase } from "typeorm/util/StringUtils";

/**
 * Snake case naming strategy for TypeORM models.
 * This will map entity property names to a snake case format like createdAt -> created_at.
 */
export class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    public tableName(className: string, customName: string): string {
        return customName || snakeCase(className);
    }

    public columnName(
        propertyName: string,
        customName: string,
        embeddedPrefixes: string[],
    ): string {
        return snakeCase(embeddedPrefixes.join("_")) + (customName || snakeCase(propertyName));
    }

    public relationName(propertyName: string): string {
        return snakeCase(propertyName);
    }

    public joinColumnName(relationName: string, referencedColumnName: string): string {
        return snakeCase(`${relationName}_${referencedColumnName}`);
    }

    public joinTableName(
        firstTableName: string,
        secondTableName: string,
        firstPropertyName: string,
    ): string {
        return snakeCase(
            `${firstTableName}_${firstPropertyName.replace(/\./gi, "_")}_${secondTableName}`,
        );
    }

    public joinTableColumnName(
        tableName: string,
        propertyName: string,
        columnName?: string,
    ): string {
        return snakeCase(`${tableName}_${columnName || propertyName}`);
    }

    public eagerJoinRelationAlias(alias: string, propertyPath: string): string {
        return `${alias}__${propertyPath.replace(".", "_")}`;
    }
}
