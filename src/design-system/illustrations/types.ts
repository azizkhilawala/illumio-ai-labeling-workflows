import type { SVGProps } from 'react';

export type IllustrationComponentProps = {
  width?: number | string;
  height?: number | string;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, 'width' | 'height'>;

export type IllustrationComponent = React.FC<IllustrationComponentProps>;

// Auto-generated from SVG files
export type IllustrationName =
  | 'error-empty-state'
  | 'positive-neutral-empty-state'
  | 'table_negative_emptystate'
  | 'table_neutral_emptystate';

export type IllustrationProps = {
  name: IllustrationName;
  width?: number | string;
  height?: number | string;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, 'width' | 'height' | 'name'>;
