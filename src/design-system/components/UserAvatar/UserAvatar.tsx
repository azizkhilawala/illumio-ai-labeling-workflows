import React from 'react';
import './user-avatar.css';

export type UserAvatarSize = 'sm' | 'md' | 'lg';

export type UserAvatarProps = {
  src?: string;
  firstName?: string;
  lastName?: string;
  initials?: string;
  alt?: string;
  size?: UserAvatarSize;
  className?: string;
};

const getInitials = (firstName?: string, lastName?: string, initials?: string): string => {
  if (initials) {
    return initials.slice(0, 2).toUpperCase();
  }

  const first = firstName?.charAt(0) || '';
  const last = lastName?.charAt(0) || '';

  return (first + last).toUpperCase() || '?';
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  firstName,
  lastName,
  initials,
  alt,
  size = 'md',
  className = '',
}) => {
  const displayInitials = getInitials(firstName, lastName, initials);
  const altText = alt || `${firstName || ''} ${lastName || ''}`.trim() || 'User avatar';

  const classes = [
    'ds-user-avatar',
    `ds-user-avatar--${size}`,
    src ? 'ds-user-avatar--image' : 'ds-user-avatar--initials',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {src ? (
        <img
          src={src}
          alt={altText}
          className="ds-user-avatar__image"
        />
      ) : (
        <span className="ds-user-avatar__initials">{displayInitials}</span>
      )}
    </div>
  );
};
