import type { IllustrationComponent } from './types';

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
