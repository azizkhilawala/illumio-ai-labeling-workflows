import type { PillIconComponent } from './types';

const pillIconRegistry = new Map<string, PillIconComponent>();

export function registerPillIcon(name: string, component: PillIconComponent): void {
  pillIconRegistry.set(name, component);
}

export function getPillIcon(name: string): PillIconComponent | undefined {
  return pillIconRegistry.get(name);
}

export function getAllPillIconNames(): string[] {
  return Array.from(pillIconRegistry.keys());
}
