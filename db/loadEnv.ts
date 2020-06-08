import path from "path";
import dotenv from "dotenv";
import { constants, promises as fs } from "fs";

const names = [".env.local", ".env"];

/**
 * Load environment variables from .env.* files.
 */
async function loadEnv(): Promise<void> {
    for (const name of names) {
        const file = path.join(process.cwd(), name);

        try {
            // eslint-disable-next-line no-await-in-loop
            await fs.access(file, constants.F_OK);
            dotenv.config({ path: file });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err.message);
            // eslint-disable-next-line no-process-exit
            process.exit(1);
        }
    }
}

loadEnv();
