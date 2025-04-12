import { defineConfig } from "eslint/config";
import { includeIgnoreFile } from "@eslint/compat";
import globals from "globals";
import { fileURLToPath } from "node:url";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
    includeIgnoreFile(gitignorePath),
    {
        languageOptions: {
            globals: {
                ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
                ...globals.commonjs,
                ...globals.node,
            },

            ecmaVersion: 2018,
            sourceType: "module",

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        rules: {
            "no-const-assign": "warn",
            "no-this-before-super": "warn",
            "no-undef": "warn",
            "no-unreachable": "warn",
            "no-unused-vars": "warn",
            "constructor-super": "warn",
            "valid-typeof": "warn",
        },
    },
    {
        files: ['*.mjs'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
        },
    },
    {
        files: ['static/**'],
        languageOptions: {
            globals: {
                ...globals.browser,
                acquireVsCodeApi: 'readonly',
            },
        },
    },
]);
