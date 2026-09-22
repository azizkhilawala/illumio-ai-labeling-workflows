import React from 'react';
import { Slash } from '@/design-system/icons/icons';
import './breadcrumb.css';

export type BreadcrumbItemData = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
};

export type BreadcrumbItemProps = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  className?: string;
};

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  label,
  href,
  icon,
  isActive = false,
  className = '',
}) => {
  const baseClass = 'ds-breadcrumb-item';
  const classes = [
    baseClass,
    isActive ? `${baseClass}--non-link` : '',
    className,
  ].filter(Boolean).join(' ');

  // Non-link state: current page, not clickable
  if (isActive || !href) {
    return (
      <span className={classes}>
        {icon && <span className="ds-breadcrumb-item__icon">{icon}</span>}
        <span className="ds-breadcrumb-item__label">{label}</span>
      </span>
    );
  }

  // Link state: clickable with hover/focus/active states
  return (
    <a href={href} className={classes}>
      {icon && <span className="ds-breadcrumb-item__icon">{icon}</span>}
      <span className="ds-breadcrumb-item__label">{label}</span>
    </a>
  );
};

export type BreadcrumbProps = {
  items: BreadcrumbItemData[];
  className?: string;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = '',
}) => {
  const classes = ['ds-breadcrumb', className].filter(Boolean).join(' ');

  return (
    <nav className={classes} aria-label="Breadcrumb">
      <ol className="ds-breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="ds-breadcrumb__list-item">
              <BreadcrumbItem
                label={item.label}
                href={item.href}
                icon={item.icon}
                isActive={isLast}
              />
              {!isLast && (
                <span className="ds-breadcrumb__separator" aria-hidden="true">
                  <Slash variant="linear" size={12} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
