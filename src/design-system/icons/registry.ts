import type { IconComponent } from './types';

// Icon registry maps kebab-case icon names to their components
// This will be populated as icons are generated
export const iconRegistry: Record<string, IconComponent> = {};

// Helper function to register an icon
export function registerIcon(name: string, component: IconComponent): void {
  iconRegistry[name] = component;
}

// Helper to convert kebab-case to PascalCase for display/debugging
export function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Helper to convert PascalCase to kebab-case for lookups
export function pascalToKebab(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
}
