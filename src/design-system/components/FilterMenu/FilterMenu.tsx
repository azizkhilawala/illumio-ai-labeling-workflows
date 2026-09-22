import React, { useState, useMemo } from 'react';
import './filter-menu.css';

type FilterCategory = {
  id: string;
  label: string;
};

type FilterOperator = {
  id: string;
  label: string;
};

type FilterValue = {
  id: string;
  label: string;
  category?: string;
  icon?: React.ReactNode;
};

type FilterMenuProps = {
  categories: FilterCategory[];
  operators?: FilterOperator[];
  values?: FilterValue[];
  selectedCategory?: string;
  selectedOperator?: string;
  selectedValue?: string;
  onCategoryChange?: (categoryId: string) => void;
  onOperatorChange?: (operatorId: string) => void;
  onValueChange?: (valueId: string) => void;
  onClear?: () => void;
  onRunQuery?: () => void;
  runQueryLabel?: string;
  className?: string;
};

const defaultOperators: FilterOperator[] = [
  { id: 'eq', label: '=' },
  { id: 'neq', label: '!=' },
];

export const FilterMenu: React.FC<FilterMenuProps> = ({
  categories,
  operators = defaultOperators,
  values = [],
  selectedCategory,
  selectedOperator,
  selectedValue,
  onCategoryChange,
  onOperatorChange,
  onValueChange,
  onClear,
  onRunQuery,
  runQueryLabel = 'Run Query (Press Enter)',
  className = '',
}) => {
  // Default to first category if none selected
  const activeCategory = selectedCategory || categories[0]?.id;
  // Default to first operator if none selected
  const activeOperator = selectedOperator || operators[0]?.id;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onRunQuery) {
      onRunQuery();
    }
  };

  const containerClasses = [
    'ds-filter-menu',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-label="Filter menu"
    >
      <div className="ds-filter-menu__columns">
        {/* Category Column */}
        <div className="ds-filter-menu__column">
          <div className="ds-filter-menu__column-header">
            <span className="ds-filter-menu__column-title">CATEGORY</span>
          </div>
          <div className="ds-filter-menu__column-content">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`ds-filter-menu__item ${activeCategory === category.id ? 'ds-filter-menu__item--selected' : ''}`}
                onClick={() => onCategoryChange?.(category.id)}
                role="option"
                aria-selected={activeCategory === category.id}
                tabIndex={0}
              >
                <span className="ds-filter-menu__item-label">{category.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Operator Column */}
        <div className="ds-filter-menu__column">
          <div className="ds-filter-menu__column-header">
            <span className="ds-filter-menu__column-title">OPERATOR</span>
          </div>
          <div className="ds-filter-menu__column-content">
            {operators.map((operator) => (
              <div
                key={operator.id}
                className={`ds-filter-menu__item ${activeOperator === operator.id ? 'ds-filter-menu__item--selected' : ''}`}
                onClick={() => onOperatorChange?.(operator.id)}
                role="option"
                aria-selected={activeOperator === operator.id}
                tabIndex={0}
              >
                <span className="ds-filter-menu__item-label">{operator.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Value Column */}
        <div className="ds-filter-menu__column ds-filter-menu__column--value">
          <div className="ds-filter-menu__column-header">
            <span className="ds-filter-menu__column-title">VALUE</span>
          </div>
          <div className="ds-filter-menu__column-content ds-filter-menu__column-content--scrollable">
            {values.length > 0 ? (
              values.map((value) => (
                <div
                  key={value.id}
                  className={`ds-filter-menu__item ds-filter-menu__item--value ${selectedValue === value.id ? 'ds-filter-menu__item--selected' : ''}`}
                  onClick={() => onValueChange?.(value.id)}
                  role="option"
                  aria-selected={selectedValue === value.id}
                  tabIndex={0}
                >
                  <div className="ds-filter-menu__item-content">
                    {value.icon && (
                      <span className="ds-filter-menu__item-icon">{value.icon}</span>
                    )}
                    <span className="ds-filter-menu__item-label">{value.label}</span>
                  </div>
                  {value.category && (
                    <span className="ds-filter-menu__item-category">{value.category}</span>
                  )}
                </div>
              ))
            ) : (
              <div className="ds-filter-menu__empty">No values available</div>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="ds-filter-menu__actions">
        <div className="ds-filter-menu__actions-left" />
        <div className="ds-filter-menu__actions-right">
          {onClear && (
            <button
              type="button"
              className="ds-filter-menu__btn ds-filter-menu__btn--ghost"
              onClick={onClear}
            >
              Clear
            </button>
          )}
          {onRunQuery && (
            <button
              type="button"
              className="ds-filter-menu__btn ds-filter-menu__btn--primary"
              onClick={onRunQuery}
            >
              {runQueryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export type { FilterMenuProps, FilterCategory, FilterOperator, FilterValue };
