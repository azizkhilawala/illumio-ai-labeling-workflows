#!/usr/bin/env npx ts-node

/**
 * Illustration Generation Script
 *
 * Converts SVG files from src/assets/illumio-illustrations/ into React components.
 * Unlike icons, illustrations preserve their original colors (no theming).
 *
 * Usage:
 *   npx ts-node scripts/generate-illustrations.ts
 *
 * Expected folder structure:
 *   src/assets/illumio-illustrations/
 *   ├── empty-state.svg
 *   ├── error.svg
 *   └── ...
 *
 * Output:
 *   src/design-system/illustrations/illustrations/EmptyState.tsx
 *   src/design-system/illustrations/illustrations/Error.tsx
 *   ...
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../src/assets/illumio-illustrations');
const OUTPUT_DIR = path.join(__dirname, '../src/design-system/illustrations/illustrations');
const TYPES_FILE = path.join(__dirname, '../src/design-system/illustrations/types.ts');

// Convert kebab-case to PascalCase
function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Extract SVG content and dimensions
function extractSvgData(svgString: string): {
  viewBox: string;
  width: string;
  height: string;
  content: string;
} {
  const viewBoxMatch = svgString.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 200 200';

  const widthMatch = svgString.match(/width="([^"]+)"/);
  const heightMatch = svgString.match(/height="([^"]+)"/);

  // Extract numeric width/height or parse from viewBox
  let width = widthMatch ? widthMatch[1].replace(/px$/, '') : '';
  let height = heightMatch ? heightMatch[1].replace(/px$/, '') : '';

  if (!width || !height) {
    const viewBoxParts = viewBox.split(' ');
    width = width || viewBoxParts[2] || '200';
    height = height || viewBoxParts[3] || '200';
  }

  // Extract content between <svg> tags
  const contentMatch = svgString.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  const content = contentMatch ? contentMatch[1].trim() : '';

  return { viewBox, width, height, content };
}

// Convert SVG attributes to React props (preserves colors unlike icons)
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
    .replace(/stop-color/g, 'stopColor')
    .replace(/stop-opacity/g, 'stopOpacity')
    .replace(/clip-path/g, 'clipPath')
    .replace(/font-family/g, 'fontFamily')
    .replace(/font-size/g, 'fontSize')
    .replace(/font-weight/g, 'fontWeight')
    .replace(/text-anchor/g, 'textAnchor')
    .replace(/xlink:href/g, 'xlinkHref');
  // NOTE: Colors are NOT replaced - illustrations keep their original colors
}

// Generate a React component for an illustration
function generateIllustrationComponent(
  name: string,
  data: { viewBox: string; width: string; height: string; content: string }
): string {
  const pascalName = kebabToPascal(name);
  const jsxContent = convertSvgToJsx(data.content);
  const aspectRatio = parseFloat(data.width) / parseFloat(data.height);

  return `import React from 'react';
import type { IllustrationComponentProps } from '../types';
import { registerIllustration } from '../registry';

export const ${pascalName}: React.FC<IllustrationComponentProps> = ({
  width,
  height,
  className = '',
  ...props
}) => {
  // Calculate dimensions maintaining aspect ratio
  const aspectRatio = ${aspectRatio.toFixed(4)};
  const defaultWidth = ${data.width};
  const defaultHeight = ${data.height};

  let finalWidth: number | string = width ?? defaultWidth;
  let finalHeight: number | string = height ?? defaultHeight;

  if (width && !height) {
    finalHeight = Number(width) / aspectRatio;
  } else if (height && !width) {
    finalWidth = Number(height) * aspectRatio;
  }

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="${data.viewBox}"
      fill="none"
      className={\`ds-illustration \${className}\`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      ${jsxContent}
    </svg>
  );
};

// Register this illustration
registerIllustration('${name}', ${pascalName});
`;
}

// Main function
async function main() {
  console.log('🎨 Illustration Generation Script');
  console.log('==================================\n');

  // Check if assets directory exists
  if (!fs.existsSync(ASSETS_DIR)) {
    console.log(`⚠️  Illustrations directory not found: ${ASSETS_DIR}`);
    console.log('\nCreating empty directory structure...');
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
    console.log('✅ Created src/assets/illumio-illustrations/');
    console.log('\nAdd SVG files to this directory and run this script again.');
    return;
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Find all SVG files
  const svgFiles = fs.readdirSync(ASSETS_DIR).filter(f => f.endsWith('.svg'));

  if (svgFiles.length === 0) {
    console.log('⚠️  No SVG files found in illustrations directory.');
    console.log(`\nAdd SVG files to: ${ASSETS_DIR}`);

    // Generate placeholder types
    generateTypesFile([]);
    generateRegistryFile();
    generateIndexFile([]);
    return;
  }

  console.log(`📁 Found ${svgFiles.length} illustration SVGs\n`);

  // Process each SVG
  const illustrationNames: string[] = [];
  const componentImports: string[] = [];

  for (const file of svgFiles) {
    const name = file.replace('.svg', '');
    const pascalName = kebabToPascal(name);
    const svgPath = path.join(ASSETS_DIR, file);
    const svgContent = fs.readFileSync(svgPath, 'utf-8');
    const data = extractSvgData(svgContent);

    const componentCode = generateIllustrationComponent(name, data);
    const outputPath = path.join(OUTPUT_DIR, `${pascalName}.tsx`);

    fs.writeFileSync(outputPath, componentCode);
    illustrationNames.push(name);
    componentImports.push(`export { ${pascalName} } from './${pascalName}';`);

    console.log(`   ✅ Generated ${pascalName}.tsx`);
  }

  // Generate barrel file for illustrations
  const illustrationsIndexContent = `// Auto-generated illustration exports
// Run 'npx ts-node scripts/generate-illustrations.ts' to regenerate

${componentImports.join('\n')}
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), illustrationsIndexContent);
  console.log('\n✅ Generated illustrations/index.ts');

  // Generate types and registry
  generateTypesFile(illustrationNames);
  generateRegistryFile();
  generateIndexFile(illustrationNames);

  console.log('\n🎉 Illustration generation complete!');
  console.log(`\nGenerated ${illustrationNames.length} illustrations.`);
  console.log('\nUsage:');
  console.log("   import { Illustration } from '@/design-system/illustrations';");
  console.log("   <Illustration name=\"empty-state\" width={200} />");
}

function generateTypesFile(names: string[]) {
  const nameUnion = names.length > 0
    ? names.map(n => `  | '${n}'`).join('\n')
    : "  | 'placeholder'";

  const content = `import type { SVGProps } from 'react';

export type IllustrationComponentProps = {
  width?: number | string;
  height?: number | string;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, 'width' | 'height'>;

export type IllustrationComponent = React.FC<IllustrationComponentProps>;

// Auto-generated from SVG files
export type IllustrationName =
${nameUnion};

export type IllustrationProps = {
  name: IllustrationName;
  width?: number | string;
  height?: number | string;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, 'width' | 'height' | 'name'>;
`;

  const typesPath = path.join(__dirname, '../src/design-system/illustrations/types.ts');
  fs.writeFileSync(typesPath, content);
  console.log('✅ Generated types.ts');
}

function generateRegistryFile() {
  const content = `import type { IllustrationComponent } from './types';

// Registry to store all illustration components
const illustrationRegistry: Record<string, IllustrationComponent> = {};

// Register an illustration component
export function registerIllustration(name: string, component: IllustrationComponent): void {
  illustrationRegistry[name] = component;
}

// Get an illustration component by name
export function getIllustration(name: string): IllustrationComponent | undefined {
  return illustrationRegistry[name];
}

// Get all registered illustration names
export function getIllustrationNames(): string[] {
  return Object.keys(illustrationRegistry);
}

export { illustrationRegistry };
`;

  const registryPath = path.join(__dirname, '../src/design-system/illustrations/registry.ts');
  fs.writeFileSync(registryPath, content);
  console.log('✅ Generated registry.ts');
}

function generateIndexFile(names: string[]) {
  const content = `// Illustration system exports
export { Illustration } from './Illustration';
export type {
  IllustrationName,
  IllustrationProps,
  IllustrationComponentProps,
  IllustrationComponent,
} from './types';
export { illustrationRegistry, getIllustration, getIllustrationNames } from './registry';

// Re-export individual illustrations for direct imports
export * from './illustrations';
`;

  const indexPath = path.join(__dirname, '../src/design-system/illustrations/index.ts');
  fs.writeFileSync(indexPath, content);
  console.log('✅ Generated index.ts');
}

main().catch(console.error);
