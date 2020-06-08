module.exports = {
    plugins: ["prettier"],
    extends: ["esnext", "node", "prettier", "plugin:prettier/recommended"],
    rules: {
        // Throw errors when files are not formatted.
        "prettier/prettier": "error",
        // Almost all the legacy code we encountered was filled with overly complex and convoluted functions and methods.
        // Set the complexity rule to prevent this from happening again as it was VERY VERY hard to diagnose bugs with this code.
        complexity: ["error", 20],
        // Disallow function expressions using the `function` keyword.
        // This is mainly to avoid confusion among developers with how the JavaScript interpreter will hoist declarations but not expressions.
        "func-style": ["error", "declaration", { allowArrowFunctions: true }],
        // Sometimes we wan't to keep methods within a particular class even if they don't use the instance object.
        // This could be to expose them to the class consumer or simply because it makes more sense grouping them.
        "class-methods-use-this": ["off"],
        "import/prefer-default-export": ["off"],
        // We use require in JavaScript files (i.e. configs and scripts) and import in TypeScript.
        "import/no-commonjs": ["off"],
        // This rule is redundant since we use TypeScript.
        "import/extensions": ["off"],
        "import/no-unresolved": ["off"],
        "import/no-nodejs-modules": ["off"],
    },
    overrides: [
        // TypeScript rules.
        // This is mainly to make ESLint compatible with TypeScript files.
        {
            files: ["*.ts", "*.tsx"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                project: "./tsconfig.json",
            },
            plugins: ["@typescript-eslint/eslint-plugin"],
            extends: [
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
            ],
            rules: {
                "prettier/prettier": [
                    "error",
                    {
                        parser: "typescript",
                    },
                ],
                // We wan't method overloads to go togheter.
                "lines-between-class-members": [
                    "error",
                    "always",
                    {
                        exceptAfterSingleLine: true,
                    },
                ],
                // Only use import in TypeScript.
                "import/no-commonjs": ["off"],
                // This rule doesn't work with bound methods in the constructor.
                "@typescript-eslint/unbound-method": ["off"],
                // This rule doesn't detect TypeScript constructors with access modifiers.
                "no-useless-constructor": ["off"],
                "@typescript-eslint/no-useless-constructor": ["error"],
                "@typescript-eslint/explicit-member-accessibility": [
                    "error",
                    {
                        accessibility: "explicit",
                        overrides: {
                            constructors: "no-public",
                        },
                    },
                ],
                // This rules are just broken and rid of false positives.
                "@typescript-eslint/no-unsafe-call": ["off"],
                "@typescript-eslint/no-unsafe-return": ["off"],
                "@typescript-eslint/no-unsafe-assignment": ["off"],
                "@typescript-eslint/no-unsafe-member-access": ["off"],
                // This rule conflicts with Prettier.
                "@typescript-eslint/type-annotation-spacing": ["off"],
                // Don't allow Typed constructors.
                "@typescript-eslint/explicit-module-boundary-types": ["off"],
            },
        },
    ],
};
