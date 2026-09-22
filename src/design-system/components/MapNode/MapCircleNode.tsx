import React from 'react';
import { Icon } from '@/design-system/icons';
import './mapnode.css';

export type MapNodeSize = 'large' | 'medium' | 'small';
export type MapNodeState = 'default' | 'hover' | 'selected' | 'focused';
export type MapNodeColorTheme = 'orange' | 'rose' | 'blue' | 'green' | 'purple' | 'red' | 'gray';

export interface MapCircleNodeProps {
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
  /** Counter value to display (shows in bottom-left glyph) */
  counter?: number;
  /** Show status indicator (green check in bottom-right) */
  showStatus?: boolean;
  /** Custom tag icon (top-right glyph) */
  tagIcon?: React.ReactNode;
  /** Provider/3rd party icon (top-left glyph) */
  providerIcon?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}


export const MapCircleNode: React.FC<MapCircleNodeProps> = ({
  size = 'large',
  state = 'default',
  colorTheme = 'rose',
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
    'ds-map-node--circle',
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
            {icon || <Icon name="user" size={24} />}
          </span>
        </div>

        {/* Counter or Expand button (bottom-left for circle) */}
        {(showCounter || isHover) && (
          <div className={`ds-map-node__glyph ${isHover ? 'ds-map-node__glyph--expand' : 'ds-map-node__glyph--counter'}`}>
            {isHover ? <Icon name="plus" size={16} /> : counter}
          </div>
        )}

        {/* Status indicator (bottom-right for circle) */}
        {showStatus && (
          <div className="ds-map-node__glyph ds-map-node__glyph--status">
            <Icon name="check" size={16} />
          </div>
        )}

        {/* Tag icon (top-right for circle) */}
        {tagIcon && (
          <div className="ds-map-node__glyph ds-map-node__glyph--tag">
            {tagIcon}
          </div>
        )}

        {/* Provider icon (top-left for circle) */}
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
