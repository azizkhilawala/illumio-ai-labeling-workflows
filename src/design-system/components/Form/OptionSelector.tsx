import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@/design-system/icons';
import './optionselector.css';

type OptionSelectorOption = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
};

type OptionSelectorProps = {
  options: OptionSelectorOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  multiSelect?: boolean;
  showCheckboxes?: boolean;
  className?: string;
};

export const OptionSelector: React.FC<OptionSelectorProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  helperText,
  error,
  required = false,
  disabled = false,
  multiSelect = false,
  showCheckboxes = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const generatedId = React.useId();

  // Normalize value to array for internal handling
  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) setIsOpen(true);
        break;
    }
  };

  const handleOptionClick = (optionId: string) => {
    if (multiSelect) {
      const newValues = selectedValues.includes(optionId)
        ? selectedValues.filter(v => v !== optionId)
        : [...selectedValues, optionId];
      onChange?.(newValues);
    } else {
      onChange?.(optionId);
      setIsOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (selectedValues.length === 0) return null;

    if (multiSelect && selectedValues.length > 1) {
      return `${selectedValues.length} selected`;
    }

    const selectedOption = options.find(opt => opt.id === selectedValues[0]);
    return selectedOption?.label || null;
  };

  const displayValue = getDisplayValue();
  const hasError = !!error;

  const containerClasses = [
    'ds-option-selector',
    hasError ? 'ds-option-selector--error' : '',
    disabled ? 'ds-option-selector--disabled' : '',
    isOpen ? 'ds-option-selector--open' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} ref={containerRef}>
      {label && (
        <label
          htmlFor={generatedId}
          className={`ds-option-selector__label ${required ? 'ds-option-selector__label--required' : ''}`}
        >
          {label}
        </label>
      )}

      <div className="ds-option-selector__wrapper">
        {/* Trigger Button */}
        <button
          id={generatedId}
          type="button"
          className="ds-option-selector__trigger"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={hasError}
          aria-describedby={error || helperText ? `${generatedId}-helper` : undefined}
        >
          <span className={`ds-option-selector__value ${!displayValue ? 'ds-option-selector__value--placeholder' : ''}`}>
            {displayValue || placeholder}
          </span>
          <span className="ds-option-selector__chevron" aria-hidden="true">
            <Icon name="chevron-down" size={10} />
          </span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="ds-option-selector__dropdown" role="listbox" aria-multiselectable={multiSelect}>
            <div className="ds-option-selector__options">
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.id);

                return (
                  <div
                    key={option.id}
                    className={`ds-option-selector__option ${isSelected ? 'ds-option-selector__option--selected' : ''} ${option.disabled ? 'ds-option-selector__option--disabled' : ''}`}
                    onClick={() => !option.disabled && handleOptionClick(option.id)}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                    tabIndex={option.disabled ? -1 : 0}
                  >
                    {/* Check mark for single select */}
                    {!showCheckboxes && (
                      <span className={`ds-option-selector__check ${isSelected ? 'ds-option-selector__check--visible' : ''}`}>
                        <Icon name="check" size={10} />
                      </span>
                    )}

                    {/* Checkbox for multi-select */}
                    {showCheckboxes && (
                      <span className={`ds-option-selector__checkbox ${isSelected ? 'ds-option-selector__checkbox--checked' : ''}`}>
                        {isSelected && <Icon name="check" size={10} />}
                      </span>
                    )}

                    {/* Icon */}
                    {option.icon && (
                      <span className="ds-option-selector__option-icon">
                        {option.icon}
                      </span>
                    )}

                    {/* Label and description */}
                    <span className="ds-option-selector__option-content">
                      <span className="ds-option-selector__option-label">{option.label}</span>
                      {option.description && (
                        <span className="ds-option-selector__option-description">{option.description}</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Helper/Error Text */}
        {(error || helperText) && (
          <span
            id={`${generatedId}-helper`}
            className="ds-option-selector__helper"
            role={error ? 'alert' : undefined}
          >
            {error || helperText}
          </span>
        )}
      </div>
    </div>
  );
};

export type { OptionSelectorProps, OptionSelectorOption };
