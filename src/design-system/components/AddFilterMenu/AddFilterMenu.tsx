"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Icon } from "@/design-system/icons";
import "./add-filter-menu.css";

export interface AvailableFilter {
  id: string;
  label: string;
}

export interface AddFilterMenuProps {
  availableFilters: AvailableFilter[];
  onAddFilter: (filterId: string) => void;
  className?: string;
}

export function AddFilterMenu({
  availableFilters,
  onAddFilter,
  className = "",
}: AddFilterMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredFilters = useMemo(() => {
    if (!searchTerm) return availableFilters;
    return availableFilters.filter((f) =>
      f.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableFilters, searchTerm]);

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
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  const handleSelectFilter = (filterId: string) => {
    onAddFilter(filterId);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  if (availableFilters.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`add-filter-menu ${isOpen ? "add-filter-menu--open" : ""} ${className}`}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className="add-filter-menu__button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Icon name="plus" size={14} />
        <span className="add-filter-menu__label">Add Filter</span>
      </button>

      {isOpen && (
        <div className="add-filter-menu__menu">
          <div className="add-filter-menu__search-container">
            <input
              ref={searchInputRef}
              type="text"
              className="add-filter-menu__search"
              placeholder="Search for Filter Field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="add-filter-menu__options">
            {filteredFilters.length === 0 ? (
              <div className="add-filter-menu__empty">No filters found</div>
            ) : (
              filteredFilters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className="add-filter-menu__option"
                  onClick={() => handleSelectFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddFilterMenu;
