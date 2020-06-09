module.exports = {
    tabWidth: 4,
    printWidth: 80,
    arrowParens: "avoid",
    trailingComma: "all",
    overrides: [
        {
            files: ["*.ts"],
            options: {
                printWidth: 100
            },
        },
    ],
};
