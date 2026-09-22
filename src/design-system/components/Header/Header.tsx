import React from 'react';
import { GlobalSearchInput } from '@/design-system/components/GlobalSearchInput';
import { Breadcrumb, type BreadcrumbItemData } from '@/design-system/components/Breadcrumb';
import { UserAvatar } from '@/design-system/components/UserAvatar';
import { CoPilotButton } from '@/design-system/components/CoPilotButton';
import { Button } from '@/design-system/components/Button';
import { CircleInformation } from '@/design-system/icons/icons';
import './header.css';

export type HeaderIconButton = {
  icon: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
};

type HeaderProps = React.PropsWithChildren<{
  breadcrumbs?: BreadcrumbItemData[];
  title?: string;
  titleIcon?: React.ReactNode;
  titleSuffix?: React.ReactNode;
  showInfoButton?: boolean;
  onInfoClick?: () => void;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  user?: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
  };
  iconButtons?: HeaderIconButton[];
  showCoPilot?: boolean;
  onCoPilotClick?: () => void;
  sticky?: boolean;
  className?: string;
}>;

export const Header: React.FC<HeaderProps> = ({
  breadcrumbs,
  title,
  titleIcon,
  titleSuffix,
  showInfoButton = false,
  onInfoClick,
  searchPlaceholder = 'Search',
  onSearch,
  user,
  iconButtons,
  showCoPilot = false,
  onCoPilotClick,
  sticky = false,
  className = '',
  children,
}) => {
  const classes = [
    'ds-header',
    sticky ? 'ds-header--sticky' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <header className={classes}>
      {/* Hidden SVG for gradient definitions */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="lightning-gradient-100" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(133.65)">
            <stop offset="6.23%" stopColor="#0052D4" />
            <stop offset="53%" stopColor="#4364F7" />
            <stop offset="94.48%" stopColor="#6FB1FC" />
          </linearGradient>
        </defs>
      </svg>
      <div className="ds-header__left">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb items={breadcrumbs} />
        )}
        {title && (
          <div className="ds-header__title-row">
            {titleIcon && <span className="ds-header__title-icon">{titleIcon}</span>}
            <h1 className="ds-header__title">{title}</h1>
            {titleSuffix && <span className="ds-header__title-suffix">{titleSuffix}</span>}
            {showInfoButton && (
              <Button
                variant="secondary-outlined"
                size="xs"
                iconOnly
                leftIcon={<CircleInformation variant="linear" size={16} />}
                onClick={onInfoClick}
                aria-label="More information"
              />
            )}
          </div>
        )}
      </div>

      <div className="ds-header__right">
        <GlobalSearchInput
          placeholder={searchPlaceholder}
          onSearch={onSearch}
        />
        {iconButtons && iconButtons.map((btn, index) => (
          <Button
            key={index}
            variant="secondary"
            size="lg"
            iconOnly
            leftIcon={btn.icon}
            onClick={btn.onClick}
            aria-label={btn.ariaLabel}
          />
        ))}
        {user && (
          <UserAvatar
            src={user.avatarUrl}
            firstName={user.firstName}
            lastName={user.lastName}
          />
        )}
        {showCoPilot && (
          <CoPilotButton onClick={onCoPilotClick} />
        )}
        {children}
      </div>
    </header>
  );
};
