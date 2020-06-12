const { pathsToModuleNameMapper } = require("ts-jest/utils");
// prettier-ignore
const { compilerOptions: { paths } } = require("./tsconfig.json");

module.exports = {
    collectCoverageFrom: ["src/**/*.ts", "!src/index.ts"],
    coverageThreshold: {
        global: {
            branches: 95,
            statements: 95,
            lines: 95,
            functions: 95,
        },
    },

    preset: "ts-jest",
    testMatch: ["**/*.test.ts"],
    moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: "<rootDir>/" }),
    setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
};
