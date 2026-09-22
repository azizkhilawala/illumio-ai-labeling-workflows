#!/usr/bin/env node

/**
 * Icon Generation Script
 *
 * Converts SVG files from src/assets/icons/{variant}/*.svg into React components.
 *
 * Usage:
 *   node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../src/assets/icons');
const OUTPUT_DIR = path.join(__dirname, '../src/design-system/icons/icons');
const TYPES_FILE = path.join(__dirname, '../src/design-system/icons/types.ts');

const VARIANTS = ['linear', 'solid', 'duotone', 'monochrome'];

// Convert kebab-case to PascalCase
function kebabToPascal(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Extract SVG content (everything inside <svg>...</svg>)
function extractSvgContent(svgString) {
  const viewBoxMatch = svgString.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  // Extract content between <svg> tags
  const contentMatch = svgString.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  const content = contentMatch ? contentMatch[1].trim() : '';

  return { viewBox, content };
}

// Convert SVG attributes to React props (e.g., stroke-width -> strokeWidth)
function convertSvgToJsx(content) {
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
function generateIconComponent(iconName, variants) {
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

// Main function
function main() {
  console.log('Icon Generation Script');
  console.log('========================\n');

  // Check if assets directory exists
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error(`Assets directory not found: ${ASSETS_DIR}`);
    console.log('\nPlease create the following structure:');
    console.log('  src/assets/icons/');
    console.log('  ├── linear/*.svg');
    console.log('  ├── solid/*.svg');
    console.log('  ├── duotone/*.svg');
    console.log('  └── monochrome/*.svg');
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Collect all icon names from all variants
  const allIcons = new Map();

  for (const variant of VARIANTS) {
    const variantDir = path.join(ASSETS_DIR, variant);

    if (!fs.existsSync(variantDir)) {
      console.log(`Warning: Variant directory not found: ${variant}/`);
      continue;
    }

    const svgFiles = fs.readdirSync(variantDir).filter(f => f.endsWith('.svg'));
    console.log(`Found ${svgFiles.length} SVGs in ${variant}/`);

    for (const file of svgFiles) {
      // Normalize icon name to lowercase kebab-case
      let iconName = file.replace('.svg', '');
      // Convert any PascalCase or mixed case to kebab-case
      iconName = iconName
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase();

      const svgPath = path.join(variantDir, file);
      const svgContent = fs.readFileSync(svgPath, 'utf-8');
      const { viewBox, content } = extractSvgContent(svgContent);

      if (!allIcons.has(iconName)) {
        allIcons.set(iconName, new Map());
      }
      allIcons.get(iconName).set(variant, { viewBox, content });
    }
  }

  console.log(`\nTotal unique icons: ${allIcons.size}`);

  // Generate component files
  const iconNames = [];
  const componentImports = [];

  for (const [iconName, variants] of allIcons) {
    const pascalName = kebabToPascal(iconName);
    const componentCode = generateIconComponent(iconName, variants);
    const outputPath = path.join(OUTPUT_DIR, `${pascalName}.tsx`);

    fs.writeFileSync(outputPath, componentCode);
    iconNames.push(iconName);
    componentImports.push(`export { ${pascalName} } from './${pascalName}';`);
  }

  console.log(`Generated ${iconNames.length} icon components\n`);

  // Generate icons barrel file
  const iconsIndexContent = `// Auto-generated icon exports
// Run 'node scripts/generate-icons.js' to regenerate

${componentImports.join('\n')}
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), iconsIndexContent);
  console.log('Generated icons/index.ts');

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
  console.log('Updated types.ts with IconName union');

  console.log('\nIcon generation complete!');
  console.log(`\nNext steps:`);
  console.log('1. Import icons in your components:');
  console.log("   import { Icon } from '@/design-system/icons';");
  console.log("   <Icon name=\"circle-exclamation\" variant=\"solid\" />");
  console.log('\n2. Or import individual icons:');
  console.log("   import { CircleExclamation } from '@/design-system/icons/icons';");
}

main();
