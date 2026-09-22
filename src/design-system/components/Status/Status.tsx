import React from 'react';
import { Icon } from '@/design-system/icons';
import './status.css';

export type StatusVariant = 'enabled' | 'disabled' | 'success' | 'fail' | 'error' | 'warning';

type Props = {
  status?: StatusVariant;
  className?: string;
};

const statusConfig: Record<StatusVariant, { icon: React.ReactNode; label: string }> = {
  enabled: { icon: <Icon name="circle-check" size={16} />, label: 'Enabled' },
  disabled: { icon: <Icon name="circle-minus" size={16} />, label: 'Disabled' },
  success: { icon: <Icon name="circle-check" size={16} />, label: 'Success' },
  fail: { icon: <Icon name="circle-xmark" size={16} />, label: 'Fail' },
  error: { icon: <Icon name="circle-exclamation" size={16} />, label: 'Error' },
  warning: { icon: <Icon name="triangle-exclamation" size={16} />, label: 'Warning' },
};

export const Status: React.FC<Props> = ({
  status = 'enabled',
  className,
}) => {
  const config = statusConfig[status];

  const classes = [
    'ds-status',
    `ds-status--${status}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      <span className="ds-status__icon">{config.icon}</span>
      <span className="ds-status__label">{config.label}</span>
    </span>
  );
};
