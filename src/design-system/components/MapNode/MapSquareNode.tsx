import React from 'react';
import { Icon } from '@/design-system/icons';
import './mapnode.css';

export type MapNodeSize = 'large' | 'medium' | 'small';
export type MapNodeState = 'default' | 'hover' | 'selected' | 'focused';
export type MapNodeColorTheme = 'orange' | 'rose' | 'blue' | 'green' | 'purple' | 'red' | 'gray';

export interface MapSquareNodeProps {
  /** Size of the node */
  size?: MapNodeSize;
  /** Interaction state */
  state?: MapNodeState;
  /** Color theme for the node */
  colorTheme?: MapNodeColorTheme;
  /** Primary label below the node */
  label?: string;
  /** Secondary label below the primary label */
  subLabel?: string;
  /** Custom icon content for the node center */
  icon?: React.ReactNode;
  /** Counter value to display (shows in top-right glyph) */
  counter?: number;
  /** Show status indicator (green check in top-left) */
  showStatus?: boolean;
  /** Custom tag icon (bottom-left glyph) */
  tagIcon?: React.ReactNode;
  /** Provider/3rd party icon (bottom-right glyph) */
  providerIcon?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}


const DefaultIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 9H15M9 12H15M9 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const MapSquareNode: React.FC<MapSquareNodeProps> = ({
  size = 'large',
  state = 'default',
  colorTheme = 'gray',
  label,
  subLabel,
  icon,
  counter,
  showStatus = false,
  tagIcon,
  providerIcon,
  className,
  onClick,
}) => {
  const isHover = state === 'hover';

  const classes = [
    'ds-map-node',
    'ds-map-node--square',
    `ds-map-node--${size}`,
    `ds-map-node--${colorTheme}`,
    state !== 'default' && `ds-map-node--${state}`,
    className,
  ].filter(Boolean).join(' ');

  const showCounter = counter !== undefined && counter > 0;

  return (
    <div className={classes} onClick={onClick}>
      {/* Node wrapper with selection ring */}
      <div className="ds-map-node__wrapper">
        {/* Inner node with icon */}
        <div className="ds-map-node__inner">
          <span className="ds-map-node__icon">
            {icon || <DefaultIcon />}
          </span>
        </div>

        {/* Counter or Expand button (top-right) */}
        {(showCounter || isHover) && (
          <div className={`ds-map-node__glyph ${isHover ? 'ds-map-node__glyph--expand' : 'ds-map-node__glyph--counter'}`}>
            {isHover ? <Icon name="plus" size={16} /> : counter}
          </div>
        )}

        {/* Status indicator (top-left) */}
        {showStatus && (
          <div className="ds-map-node__glyph ds-map-node__glyph--status">
            <Icon name="check" size={16} />
          </div>
        )}

        {/* Tag icon (bottom-left) */}
        {tagIcon && (
          <div className="ds-map-node__glyph ds-map-node__glyph--tag">
            {tagIcon}
          </div>
        )}

        {/* Provider icon (bottom-right) */}
        {providerIcon && (
          <div className="ds-map-node__glyph ds-map-node__glyph--provider">
            {providerIcon}
          </div>
        )}
      </div>

      {/* Labels */}
      {(label || subLabel) && (
        <div className="ds-map-node__labels">
          {label && <span className="ds-map-node__label">{label}</span>}
          {subLabel && <span className="ds-map-node__sublabel">{subLabel}</span>}
        </div>
      )}
    </div>
  );
};
