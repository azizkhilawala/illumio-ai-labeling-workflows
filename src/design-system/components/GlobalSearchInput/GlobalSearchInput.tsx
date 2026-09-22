import React from 'react';
import { Search, Command } from '@/design-system/icons/icons';
import './global-search-input.css';

export type GlobalSearchInputProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onActivate?: () => void;
  className?: string;
};

export const GlobalSearchInput: React.FC<GlobalSearchInputProps> = ({
  placeholder = 'Search',
  onSearch,
  onActivate,
  className = '',
}) => {
  const classes = ['ds-global-search-input', className].filter(Boolean).join(' ');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch((e.target as HTMLInputElement).value);
    }
  };

  const handleShortcutClick = () => {
    onActivate?.();
  };

  return (
    <div className={classes}>
      <div className="ds-global-search-input__left">
        <span className="ds-global-search-input__icon">
          <Search variant="linear" size={13} />
        </span>
        <input
          type="text"
          className="ds-global-search-input__field"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button
        type="button"
        className="ds-global-search-input__shortcut"
        onClick={handleShortcutClick}
        aria-label="Press Command K to search"
      >
        <Command variant="linear" size={16} />
        <span>K</span>
      </button>
    </div>
  );
};
