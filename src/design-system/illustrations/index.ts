// Illustration system exports
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
