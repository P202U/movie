import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config} */
const config = {
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node,
        },
        parser: tsparser,
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: "module",
        },
      },
      rules: {
        // Add any specific rules you want to enforce
      },
    },
  ],
  plugins: {
    // Register plugins
    "@typescript-eslint": tseslint,
    "react": pluginReact,
  },
  extends: [
    "plugin:@typescript-eslint/recommended", // TypeScript rules
    "plugin:react/recommended", // React rules
    "plugin:react/jsx-runtime", // React 17+ JSX runtime
    pluginJs.configs.recommended, // JavaScript rules
  ],
  settings: {
    react: {
      version: "detect", // Automatically detect the React version
    },
  },
  rules: {
    // Add any custom rules here
  },
};

export default config;