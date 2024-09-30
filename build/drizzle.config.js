"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var drizzle_kit_1 = require("drizzle-kit");
(0, dotenv_1.config)({ path: '.env' });
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: './src/config/db/schema.ts',
    out: './migrations',
    dialect: 'sqlite',
    driver: 'turso',
    dbCredentials: {
        url: process.env.TURSO_CONNECTION_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    },
});
