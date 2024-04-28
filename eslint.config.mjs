import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    // config with just ignores is the replacement for `.eslintignore`
    ignores: [
      ".next/",
      "db/edgedb/",
      "auth-setup.ts",
      "password-auth-setup.ts",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  prettierConfig,
  {
    rules: {
      /**
       * Disable for performance
       * See: https://typescript-eslint.io/troubleshooting/performance-troubleshooting
       */
      "@typescript-eslint/indent": "off",
      /**
       * Disallow unused variables.
       *
       * 🚫 Not fixable - https://typescript-eslint.io/rules/no-unused-vars
       */
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    languageOptions: {
      parserOptions: {
        EXPERIMENTAL_useProjectService: true,
      },
    },
  },
  {
    files: ["*.mjs"],
    ...tseslint.configs.disableTypeChecked,
  },
);
