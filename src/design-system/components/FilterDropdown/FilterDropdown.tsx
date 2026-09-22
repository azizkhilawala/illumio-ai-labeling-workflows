"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Icon } from "@/design-system/icons";
import "./filter-dropdown.css";

export interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  className?: string;
}

export function FilterDropdown({
  label,
  options,
  selectedValues,
  onChange,
  searchPlaceholder = "Search",
  showSearch = true,
  className = "",
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const hasSelection = selectedValues.length > 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      if (showSearch && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, showSearch]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  const handleOptionToggle = (optionId: string) => {
    if (selectedValues.includes(optionId)) {
      onChange(selectedValues.filter((v) => v !== optionId));
    } else {
      onChange([...selectedValues, optionId]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <div
      ref={containerRef}
      className={`filter-dropdown ${isOpen ? "filter-dropdown--open" : ""} ${hasSelection ? "filter-dropdown--active" : ""} ${className}`}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className="filter-dropdown__button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="filter-dropdown__label">
          {label}
          {hasSelection && (
            <span className="filter-dropdown__count">({selectedValues.length})</span>
          )}
        </span>
        <Icon
          name="chevron-down"
          size={14}
          className={`filter-dropdown__chevron ${isOpen ? "filter-dropdown__chevron--rotated" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="filter-dropdown__menu">
          {showSearch && (
            <div className="filter-dropdown__search-container">
              <input
                ref={searchInputRef}
                type="text"
                className="filter-dropdown__search"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          <div className="filter-dropdown__options" role="listbox">
            {filteredOptions.length === 0 ? (
              <div className="filter-dropdown__empty">No results found</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selectedValues.includes(option.id);
                return (
                  <label
                    key={option.id}
                    className={`filter-dropdown__option ${isSelected ? "filter-dropdown__option--selected" : ""}`}
                  >
                    <input
                      type="checkbox"
                      className="filter-dropdown__checkbox"
                      checked={isSelected}
                      onChange={() => handleOptionToggle(option.id)}
                    />
                    <span className="filter-dropdown__checkbox-visual">
                      {isSelected && <Icon name="check" size={10} />}
                    </span>
                    {option.icon && (
                      <span className="filter-dropdown__option-icon">
                        {option.icon}
                      </span>
                    )}
                    <span className="filter-dropdown__option-label">
                      {option.label}
                    </span>
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
