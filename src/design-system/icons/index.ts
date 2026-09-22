// Main Icon component
export { Icon } from './Icon';

// Types
export type {
  IconProps,
  IconVariant,
  IconSize,
  IconName,
  IconComponentProps,
  IconComponent,
} from './types';

// Registry utilities (for advanced use cases)
export { iconRegistry, registerIcon } from './registry';

// Individual icon components - import from './icons' for tree-shaking
export * from './icons';
