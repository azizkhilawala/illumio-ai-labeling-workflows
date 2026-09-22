#!/usr/bin/env npx ts-node

/**
 * Pill Icon Generation Script
 *
 * Converts Pill Icon SVG files into React components with dual-color support.
 * Each icon has a background circle and foreground icon content that can be
 * independently colored using bgColor and iconColor props.
 *
 * Usage:
 *   npx ts-node scripts/generate-pill-icons.ts
 *
 * Source:
 *   src/assets/illumio-icons/single/Pill Icon/
 *
 * Output:
 *   src/design-system/pill-icons/icons/
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '../src/assets/illumio-icons/single/Pill Icon');
const OUTPUT_DIR = path.join(__dirname, '../src/design-system/pill-icons/icons');
const TYPES_FILE = path.join(__dirname, '../src/design-system/pill-icons/types.ts');

// Convert kebab-case to PascalCase
function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Convert filename to valid component name
function toComponentName(filename: string): string {
  // Remove .svg extension
  let name = filename.replace('.svg', '');

  // Replace spaces and special characters with hyphens
  name = name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');

  // Convert to PascalCase
  return kebabToPascal(name);
}

// Convert filename to icon name (kebab-case)
function toIconName(filename: string): string {
  let name = filename.replace('.svg', '');
  // Replace spaces with hyphens, lowercase
  name = name.replace(/\s+/g, '-').toLowerCase();
  // Remove special characters
  name = name.replace(/[^a-z0-9-]/g, '');
  return name;
}

// Extract viewBox from SVG
function extractViewBox(svgString: string): string {
  const match = svgString.match(/viewBox="([^"]+)"/);
  return match ? match[1] : '0 0 18 18';
}

// Extract circle element (background)
function extractCircle(svgString: string): string | null {
  const match = svgString.match(/<circle[^>]*\/>/);
  return match ? match[0] : null;
}

// Extract everything between <svg> tags except circle, defs, and clipPath
function extractForegroundContent(svgString: string): string {
  // Get content between svg tags
  const contentMatch = svgString.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  if (!contentMatch) return '';

  let content = contentMatch[1];

  // Remove circle element
  content = content.replace(/<circle[^>]*\/>/g, '');

  // Remove defs and clipPath sections (we'll handle clip-path inline)
  content = content.replace(/<defs>[\s\S]*?<\/defs>/g, '');

  // Remove clip-path attributes since we're removing defs
  content = content.replace(/clip-path="[^"]*"/g, '');

  // Trim whitespace
  content = content.trim();

  return content;
}

// Convert SVG attributes to JSX props
function convertToJsx(content: string): string {
  return content
    // Convert hyphenated attributes to camelCase
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
    // Replace foreground fill colors with iconColor prop
    .replace(/fill="white"/g, 'fill={iconColor}')
    .replace(/fill="#[fF]{6}"/g, 'fill={iconColor}')
    .replace(/fill="#[fF]{3}"/g, 'fill={iconColor}')
    // Handle any other fill colors as iconColor (except "none")
    .replace(/fill="(?!none)(?!\{)[^"]+"/g, 'fill={iconColor}');
}

// Generate a React component for a pill icon
function generateComponent(
  componentName: string,
  iconName: string,
  viewBox: string,
  foregroundContent: string
): string {
  const jsxContent = convertToJsx(foregroundContent);

  return `import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const ${componentName}: React.FC<PillIconComponentProps> = ({
  size = 18,
  bgColor = 'var(--lightning-bluegray-600)',
  iconColor = 'var(--lightning-contrast-white)',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="${viewBox}"
      fill="none"
      className={\`ds-pill-icon \${className}\`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="9" cy="9" r="9" fill={bgColor} />
      {/* Icon content */}
      ${jsxContent}
    </svg>
  );
};

registerPillIcon('${iconName}', ${componentName});
`;
}

// Main function
async function main() {
  console.log('🎨 Pill Icon Generation Script');
  console.log('==============================\n');

  // Ensure source directory exists
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Read all SVG files
  const svgFiles = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.svg'));
  console.log(`📂 Found ${svgFiles.length} SVG files in Pill Icon folder\n`);

  const iconNames: string[] = [];
  const componentImports: string[] = [];
  let successCount = 0;
  let errorCount = 0;

  for (const file of svgFiles) {
    const filePath = path.join(SOURCE_DIR, file);
    const svgContent = fs.readFileSync(filePath, 'utf-8');

    const componentName = toComponentName(file);
    const iconName = toIconName(file);
    const viewBox = extractViewBox(svgContent);
    const foregroundContent = extractForegroundContent(svgContent);

    if (!foregroundContent) {
      console.log(`⚠️  Skipping ${file} - no foreground content found`);
      errorCount++;
      continue;
    }

    try {
      const componentCode = generateComponent(componentName, iconName, viewBox, foregroundContent);
      const outputPath = path.join(OUTPUT_DIR, `${componentName}.tsx`);

      fs.writeFileSync(outputPath, componentCode);
      iconNames.push(iconName);
      componentImports.push(`export { ${componentName} } from './${componentName}';`);
      successCount++;
    } catch (error) {
      console.log(`❌ Error processing ${file}:`, error);
      errorCount++;
    }
  }

  console.log(`\n✅ Generated ${successCount} icon components`);
  if (errorCount > 0) {
    console.log(`⚠️  ${errorCount} files skipped or had errors`);
  }

  // Generate icons barrel file (index.ts)
  const iconsIndexContent = `// Auto-generated pill icon exports
// Run 'npx ts-node scripts/generate-pill-icons.ts' to regenerate

${componentImports.sort().join('\n')}
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), iconsIndexContent);
  console.log('\n✅ Generated icons/index.ts');

  // Update types.ts with PillIconName union
  const iconNameUnion = iconNames.length > 0
    ? iconNames.sort().map(n => `  | '${n}'`).join('\n')
    : "  | 'placeholder'";

  const typesContent = `export type PillIconSize = 12 | 14 | 16 | 18 | 20 | 24 | number;

export type LabelType = 'app' | 'role' | 'env' | 'loc';

export type PillIconComponentProps = {
  size?: PillIconSize;
  bgColor?: string;
  iconColor?: string;
  className?: string;
};

export type PillIconComponent = React.FC<PillIconComponentProps>;

// Auto-generated from SVG files
export type PillIconName =
${iconNameUnion};

export type PillIconProps = {
  name: PillIconName;
  size?: PillIconSize;
  bgColor?: string;
  iconColor?: string;
  labelType?: LabelType;
  className?: string;
};
`;

  fs.writeFileSync(TYPES_FILE, typesContent);
  console.log('✅ Updated types.ts with PillIconName union');

  console.log('\n🎉 Pill icon generation complete!');
  console.log(`\nUsage examples:`);
  console.log('  import { PillIcon } from "@/design-system/pill-icons";');
  console.log('  <PillIcon name="app" labelType="app" />');
  console.log('  <PillIcon name="role" labelType="role" />');
  console.log('  <PillIcon name="env" labelType="env" />');
}

main().catch(console.error);
