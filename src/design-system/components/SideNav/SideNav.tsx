import React, { useState } from 'react';
import './sidenav.css';
import { Logo } from '../Logo';
import { ChevronLeft, ChevronDown } from '../../icons/icons';

type SideNavProps = React.PropsWithChildren<{
  collapsed?: boolean;
  logo?: React.ReactNode;
  showLogo?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}>;

export const SideNav: React.FC<SideNavProps> = ({
  collapsed = false,
  logo,
  showLogo = true,
  onToggleCollapse,
  className = '',
  children,
}) => {
  // Use provided logo or default to Illumio Logo
  const logoElement = logo !== undefined ? logo : (showLogo ? <Logo variant={collapsed ? 'icon' : 'full'} size="sm" /> : null);
  const classes = [
    'ds-sidenav',
    collapsed ? 'ds-sidenav--collapsed' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav className={classes}>
      {(logoElement || onToggleCollapse) && (
        <div className="ds-sidenav__header">
          {logoElement && <div className="ds-sidenav__logo">{logoElement}</div>}
          {onToggleCollapse && (
            <button
              className="ds-sidenav__toggle"
              onClick={onToggleCollapse}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              type="button"
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>
      )}
      <div className="ds-sidenav__content">
        {children}
      </div>
    </nav>
  );
};

type SideNavSectionProps = React.PropsWithChildren<{
  title?: string;
  defaultExpanded?: boolean;
  collapsible?: boolean;
  className?: string;
}>;

export const SideNavSection: React.FC<SideNavSectionProps> = ({
  title,
  defaultExpanded = true,
  collapsible = false,
  className = '',
  children,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    if (collapsible) {
      setExpanded(!expanded);
    }
  };

  return (
    <div className={`ds-sidenav__section ${className}`}>
      {title && (
        <button
          className={`ds-sidenav__section-header ${collapsible ? 'ds-sidenav__section-header--collapsible' : ''}`}
          onClick={handleToggle}
          type="button"
          aria-expanded={expanded}
        >
          <span className="ds-sidenav__section-title">{title}</span>
          {collapsible && (
            <span className={`ds-sidenav__section-chevron ${expanded ? 'ds-sidenav__section-chevron--expanded' : ''}`}>
              <ChevronDown size={12} />
            </span>
          )}
        </button>
      )}
      {expanded && (
        <ul className="ds-sidenav__list">
          {children}
        </ul>
      )}
    </div>
  );
};

type SideNavItemLevel = 1 | 2 | 3;

type SideNavItemProps = React.PropsWithChildren<{
  href?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  level?: SideNavItemLevel;
  onClick?: React.MouseEventHandler;
  className?: string;
}>;

export const SideNavItem: React.FC<SideNavItemProps> = ({
  href,
  icon,
  badge,
  active = false,
  disabled = false,
  expandable = false,
  expanded: controlledExpanded,
  defaultExpanded = false,
  level = 1,
  onClick,
  className = '',
  children,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const expanded = controlledExpanded ?? internalExpanded;

  // Check if children contains sub-items (for expandable items)
  const hasSubItems = expandable && React.Children.count(children) > 0;
  const isTextOnly = !hasSubItems;

  const classes = [
    'ds-sidenav__item',
    `ds-sidenav__item--level-${level}`,
    active ? 'ds-sidenav__item--active' : '',
    disabled ? 'ds-sidenav__item--disabled' : '',
    expandable ? 'ds-sidenav__item--expandable' : '',
    expanded ? 'ds-sidenav__item--expanded' : '',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e: React.MouseEvent) => {
    if (expandable && hasSubItems) {
      e.preventDefault();
      setInternalExpanded(!expanded);
    }
    onClick?.(e);
  };

  const content = (
    <>
      {icon && <span className="ds-sidenav__item-icon">{icon}</span>}
      <span className="ds-sidenav__item-label">{isTextOnly ? children : (typeof children === 'string' ? children : React.Children.toArray(children)[0])}</span>
      {badge && <span className="ds-sidenav__item-badge">{badge}</span>}
      {expandable && (
        <span className={`ds-sidenav__item-chevron ${expanded ? 'ds-sidenav__item-chevron--expanded' : ''}`}>
          <ChevronDown size={16} />
        </span>
      )}
    </>
  );

  const itemElement = href && !disabled ? (
    <a className={classes} href={href} onClick={handleClick}>
      {content}
    </a>
  ) : (
    <button
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      type="button"
    >
      {content}
    </button>
  );

  return (
    <li className="ds-sidenav__item-wrapper">
      {itemElement}
      {expandable && hasSubItems && expanded && (
        <ul className="ds-sidenav__sublist">
          {React.Children.toArray(children).slice(1)}
        </ul>
      )}
    </li>
  );
};

type SideNavSubItemProps = React.PropsWithChildren<{
  href?: string;
  active?: boolean;
  badge?: React.ReactNode;
  expandable?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onClick?: React.MouseEventHandler;
  className?: string;
}>;

export const SideNavSubItem: React.FC<SideNavSubItemProps> = ({
  href,
  active = false,
  badge,
  expandable = false,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onClick,
  className = '',
  children,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const expanded = controlledExpanded ?? internalExpanded;

  // Separate label from nested children for expandable items
  const childArray = React.Children.toArray(children);
  const hasNestedItems = expandable && childArray.length > 1;
  const label = hasNestedItems ? childArray[0] : children;
  const nestedItems = hasNestedItems ? childArray.slice(1) : [];

  const classes = [
    'ds-sidenav__subitem',
    active ? 'ds-sidenav__subitem--active' : '',
    expandable ? 'ds-sidenav__subitem--expandable' : '',
    expanded ? 'ds-sidenav__subitem--expanded' : '',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e: React.MouseEvent) => {
    if (expandable && hasNestedItems) {
      e.preventDefault();
      setInternalExpanded(!expanded);
    }
    onClick?.(e);
  };

  const content = (
    <>
      <span className="ds-sidenav__subitem-branch" aria-hidden="true" />
      <span className="ds-sidenav__subitem-content">
        <span className="ds-sidenav__subitem-label">{label}</span>
        {badge && <span className="ds-sidenav__subitem-badge">{badge}</span>}
        {expandable && (
          <span className={`ds-sidenav__subitem-chevron ${expanded ? 'ds-sidenav__subitem-chevron--expanded' : ''}`}>
            <ChevronDown size={16} />
          </span>
        )}
      </span>
    </>
  );

  const itemElement = href && !expandable ? (
    <a className={classes} href={href} onClick={handleClick}>
      {content}
    </a>
  ) : (
    <button className={classes} onClick={handleClick} type="button">
      {content}
    </button>
  );

  return (
    <li className="ds-sidenav__subitem-wrapper">
      {itemElement}
      {expandable && hasNestedItems && expanded && (
        <ul className="ds-sidenav__sublist ds-sidenav__sublist--nested">
          {nestedItems}
        </ul>
      )}
    </li>
  );
};

type SideNavDividerProps = {
  className?: string;
};

export const SideNavDivider: React.FC<SideNavDividerProps> = ({
  className = '',
}) => {
  return <div className={`ds-sidenav__divider ${className}`} />;
};

type SideNavFooterProps = React.PropsWithChildren<{
  className?: string;
}>;

export const SideNavFooter: React.FC<SideNavFooterProps> = ({
  className = '',
  children,
}) => {
  return (
    <div className={`ds-sidenav__footer ${className}`}>
      {children}
    </div>
  );
};
