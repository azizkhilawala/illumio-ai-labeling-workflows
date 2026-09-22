import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/generated/**",
    ".agents/**",
    ".superpowers/**",
    ".claude/**",
    ".kiro/**",
    ".trae/**",
    "scripts/**/*.js",
  ]),
  {
    rules: {
      "react-hooks/immutability": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
    },
  },
  // Block inline SVGs - use Icon component instead
  {
    files: ["src/**/*.tsx"],
    ignores: [
      "src/design-system/icons/**",
      "src/design-system/pill-icons/**",
      "src/design-system/illustrations/**",
      "src/design-system/components/Logo/**",
      "src/design-system/components/Illustration/**",
      "src/design-system/components/Checkbox/**",
      "src/design-system/components/VideoBanner/**",
    ],
    rules: {
      "no-restricted-syntax": [
        "warn",
        {
          selector: 'JSXOpeningElement[name.name="svg"]',
          message: 'Use <Icon name="..." /> from @/design-system/icons instead of inline SVGs. See docs for available icons.',
        },
      ],
    },
  },
]);

export default eslintConfig;
