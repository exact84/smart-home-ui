const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const unicorn = require("eslint-plugin-unicorn").default;
const prettier = require("eslint-config-prettier");
const eslintPluginPrettier = require("eslint-plugin-prettier");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
      {
        plugins: {
          unicorn,
        },
        rules: unicorn.configs.recommended.rules,
      },
      prettier,
    ],
    plugins: {
      unicorn,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" },
      ],
      "unicorn/better-regex": "error",
      "unicorn/no-empty-file": "error",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "error",
      "unicorn/filename-case": "off",
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [...angular.configs.templateRecommended],
  },
);
