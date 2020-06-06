const fs = require("fs");
const { constants } = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const paths = [".env.local", ".env"];

for (const p of paths) {
    const file = path.join(process.cwd(), p);

    if (fs.existsSync(file)) {
        dotenv.config({ path: file });
    }
}
