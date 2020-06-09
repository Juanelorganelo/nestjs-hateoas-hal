import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const names = [".env.local", ".env"];

for (const name of names) {
    const file = path.join(process.cwd(), name);

    // There is no async method for exists.
    // eslint-disable-next-line no-sync
    if (fs.existsSync(file)) {
        dotenv.config({ path: file });
    }
}
