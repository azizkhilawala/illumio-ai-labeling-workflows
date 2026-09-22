#!/usr/bin/env npx ts-node

/**
 * Icon Generation Script
 *
 * Converts SVG files from multiple source directories into React components.
 *
 * Usage:
 *   npx ts-node scripts/generate-icons.ts
 *
 * Supported source directories:
 *   src/assets/icons/           <- Dazzle icons (external library)
 *   src/assets/illumio-icons/   <- Custom Illumio icons
 *
 * Expected folder structure per source:
 *   {source}/
 *   ├── linear/      <- Linear/outlined style
 *   ├── solid/       <- Solid/filled style
 *   ├── duotone/     <- Duotone style (two-tone)
 *   ├── monochrome/  <- Monochrome style
 *   └── single/      <- Single-style icons (no variants)
 *
 * Output:
 *   src/design-system/icons/icons/CircleExclamation.tsx
 *   src/design-system/icons/icons/AddressBook.tsx
 *   ...
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multiple source directories for icons
const ICON_SOURCES = [
  path.join(__dirname, '../src/assets/icons'),          // Dazzle icons
  path.join(__dirname, '../src/assets/illumio-icons'),  // Custom Illumio icons
];

const OUTPUT_DIR = path.join(__dirname, '../src/design-system/icons/icons');
const REGISTRY_FILE = path.join(__dirname, '../src/design-system/icons/registry.ts');
const TYPES_FILE = path.join(__dirname, '../src/design-system/icons/types.ts');

// Standard variants + 'single' for icons without variant support
const VARIANTS = ['linear', 'solid', 'duotone', 'monochrome', 'single'] as const;

// Folders to exclude from icon generation (handled by separate scripts)
const EXCLUDED_FOLDERS = ['Pill Icon'];

// Convert kebab-case to PascalCase
function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Extract SVG content (everything inside <svg>...</svg>)
function extractSvgContent(svgString: string): { viewBox: string; content: string } {
  const viewBoxMatch = svgString.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  // Extract content between <svg> tags
  const contentMatch = svgString.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  const content = contentMatch ? contentMatch[1].trim() : '';

  return { viewBox, content };
}

// Convert SVG attributes to React props (e.g., stroke-width -> strokeWidth)
function convertSvgToJsx(content: string): string {
  return content
    .replace(/stroke-width/g, 'strokeWidth')
    .replace(/stroke-linecap/g, 'strokeLinecap')
    .replace(/stroke-linejoin/g, 'strokeLinejoin')
    .replace(/fill-rule/g, 'fillRule')
    .replace(/clip-rule/g, 'clipRule')
    .replace(/stroke-dasharray/g, 'strokeDasharray')
    .replace(/stroke-dashoffset/g, 'strokeDashoffset')
    .replace(/stroke-miterlimit/g, 'strokeMiterlimit')
    .replace(/stroke-opacity/g, 'strokeOpacity')
    .replace(/fill-opacity/g, 'fillOpacity')
    // Replace static colors with props
    .replace(/stroke="[^"]+"/g, 'stroke={color}')
    .replace(/fill="(?!none)[^"]+"/g, 'fill={color}');
}

// Generate a React component for a single icon
function generateIconComponent(
  iconName: string,
  variants: Map<string, { viewBox: string; content: string }>
): string {
  const pascalName = kebabToPascal(iconName);

  // Get viewBox from first available variant
  const firstVariant = variants.values().next().value;
  const viewBox = firstVariant?.viewBox || '0 0 24 24';

  const variantCases = Array.from(variants.entries())
    .map(([variant, { content }]) => {
      const jsxContent = convertSvgToJsx(content);
      return `      {variant === '${variant}' && (
        <>${jsxContent}</>
      )}`;
    })
    .join('\n');

  return `import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ${pascalName}: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="${viewBox}"
      fill="none"
      className={\`ds-icon \${className}\`}
      xmlns="http://www.w3.org/2000/svg"
    >
${variantCases}
    </svg>
  );
};

// Register this icon
registerIcon('${iconName}', ${pascalName});
`;
}

// Recursively find all SVG files in a directory
function findSvgFiles(dir: string): { file: string; relativePath: string }[] {
  const results: { file: string; relativePath: string }[] = [];

  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip excluded folders (e.g., Pill Icon - handled by separate script)
      if (EXCLUDED_FOLDERS.includes(entry.name)) {
        continue;
      }
      // Recursively scan subdirectories
      const subResults = findSvgFiles(fullPath);
      results.push(...subResults);
    } else if (entry.isFile() && entry.name.endsWith('.svg')) {
      results.push({ file: fullPath, relativePath: entry.name });
    }
  }

  return results;
}

// Main function
async function main() {
  console.log('🎨 Icon Generation Script');
  console.log('========================\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Collect all icon names from all variants across all sources
  const allIcons = new Map<string, Map<string, { viewBox: string; content: string }>>();

  // Process each icon source directory
  for (const sourceDir of ICON_SOURCES) {
    if (!fs.existsSync(sourceDir)) {
      console.log(`⚠️  Source directory not found: ${sourceDir}`);
      continue;
    }

    const sourceName = path.basename(sourceDir);
    console.log(`\n📂 Processing source: ${sourceName}/`);

    for (const variant of VARIANTS) {
      const variantDir = path.join(sourceDir, variant);

      if (!fs.existsSync(variantDir)) {
        continue;
      }

      // Use recursive search for 'single' variant (may have subfolders)
      // Use flat search for other variants
      const svgFiles = variant === 'single'
        ? findSvgFiles(variantDir)
        : fs.readdirSync(variantDir)
            .filter(f => f.endsWith('.svg'))
            .map(f => ({ file: path.join(variantDir, f), relativePath: f }));

      if (svgFiles.length === 0) continue;

      console.log(`   📁 Found ${svgFiles.length} SVGs in ${variant}/`);

      for (const { file: svgPath, relativePath } of svgFiles) {
        const iconName = relativePath.replace('.svg', '');
        const svgContent = fs.readFileSync(svgPath, 'utf-8');
        const { viewBox, content } = extractSvgContent(svgContent);

        if (!allIcons.has(iconName)) {
          allIcons.set(iconName, new Map());
        }

        // For 'single' variant, store as 'linear' so it renders by default
        const variantKey = variant === 'single' ? 'linear' : variant;
        allIcons.get(iconName)!.set(variantKey, { viewBox, content });
      }
    }
  }

  console.log(`\n📊 Total unique icons: ${allIcons.size}`);

  // Generate component files
  const iconNames: string[] = [];
  const componentImports: string[] = [];

  for (const [iconName, variants] of allIcons) {
    const pascalName = kebabToPascal(iconName);
    const componentCode = generateIconComponent(iconName, variants);
    const outputPath = path.join(OUTPUT_DIR, `${pascalName}.tsx`);

    fs.writeFileSync(outputPath, componentCode);
    iconNames.push(iconName);
    componentImports.push(`export { ${pascalName} } from './${pascalName}';`);
  }

  console.log(`✅ Generated ${iconNames.length} icon components\n`);

  // Generate icons barrel file
  const iconsIndexContent = `// Auto-generated icon exports
// Run 'npx ts-node scripts/generate-icons.ts' to regenerate

${componentImports.join('\n')}
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), iconsIndexContent);
  console.log('✅ Generated icons/index.ts');

  // Update types.ts with IconName union
  const iconNameUnion = iconNames.length > 0
    ? iconNames.map(n => `  | '${n}'`).join('\n')
    : "  | 'placeholder'";

  const typesContent = `export type IconVariant = 'linear' | 'solid' | 'duotone' | 'monochrome';

export type IconSize = 12 | 16 | 20 | 24 | 32 | number;

export type IconComponentProps = {
  variant?: IconVariant;
  size?: IconSize;
  color?: string;
  className?: string;
};

export type IconComponent = React.FC<IconComponentProps>;

// Auto-generated from SVG files
export type IconName =
${iconNameUnion};

export type IconProps = {
  name: IconName;
  variant?: IconVariant;
  size?: IconSize;
  color?: string;
  className?: string;
};
`;

  fs.writeFileSync(TYPES_FILE, typesContent);
  console.log('✅ Updated types.ts with IconName union');

  console.log('\n🎉 Icon generation complete!');
  console.log(`\nNext steps:`);
  console.log('1. Import icons in your components:');
  console.log("   import { Icon } from '@/design-system/icons';");
  console.log("   <Icon name=\"circle-exclamation\" variant=\"solid\" />");
  console.log('\n2. Or import individual icons:');
  console.log("   import { CircleExclamation } from '@/design-system/icons/icons';");
}

main().catch(console.error);
