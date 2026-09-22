'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/design-system/components/Modal';
import { Button } from '@/design-system/components/Button';
import { TextField } from '@/design-system/components/Form/TextField';
import { OptionSelector } from '@/design-system/components/Form/OptionSelector';
import { Pill, PillGroup } from '@/design-system/components/Pill';
import { NotificationBanner } from '@/design-system/components/NotificationBanner';
import { Icon } from '@/design-system/icons';
import type { Resource, Label } from './data';
import { getLabelById } from './data';
import styles from './EditLabelsModal.module.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface EditLabelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedResources: Resource[];
  availableLabels: Label[];
  onSave: (resourceIds: string[], labelIds: string[]) => void;
  onCreateLabel: (label: Label) => void;
  initialLabelIds?: string[];
}

type ModalMode = 'checklist' | 'creating';

const LABEL_TYPE_TO_PILL_TYPE: Record<string, 'app' | 'role' | 'env' | 'loc' | undefined> = {
  Application: 'app',
  Environment: 'env',
  Location: 'loc',
  Role: 'role',
  System: undefined,
  Terraform: undefined,
};

const LABEL_TYPE_OPTIONS = [
  { id: 'Application', label: 'Application' },
  { id: 'Environment', label: 'Environment' },
  { id: 'Location', label: 'Location' },
  { id: 'Role', label: 'Role' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const EditLabelsModal: React.FC<EditLabelsModalProps> = ({
  isOpen,
  onClose,
  selectedResources,
  availableLabels,
  onSave,
  onCreateLabel,
  initialLabelIds,
}) => {
  // ---- state ----
  const [modalMode, setModalMode] = useState<ModalMode>('checklist');
  const [pendingLabelIds, setPendingLabelIds] = useState<Set<string>>(new Set());
  const [originalLabelIds, setOriginalLabelIds] = useState<Set<string>>(new Set());
  const [activeWarning, setActiveWarning] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newLabelName, setNewLabelName] = useState('');
  const [newLabelType, setNewLabelType] = useState('');

  // ---- initialise / reset when modal opens / closes ----
  useEffect(() => {
    if (isOpen && selectedResources.length > 0) {
      if (initialLabelIds) {
        setPendingLabelIds(new Set(initialLabelIds));
        setOriginalLabelIds(new Set(initialLabelIds));
      } else {
        const allLabelIds = new Set<string>();
        selectedResources.forEach((r) => r.labels.forEach((lid) => allLabelIds.add(lid)));
        setPendingLabelIds(new Set(allLabelIds));
        setOriginalLabelIds(new Set(allLabelIds));
      }
      setModalMode('checklist');
      setActiveWarning(null);
      setSearchQuery('');
      setNewLabelName('');
      setNewLabelType('');
    }
    if (!isOpen) {
      setPendingLabelIds(new Set());
      setOriginalLabelIds(new Set());
      setModalMode('checklist');
      setActiveWarning(null);
      setSearchQuery('');
      setNewLabelName('');
      setNewLabelType('');
    }
  }, [isOpen, selectedResources, initialLabelIds]);

  // ---- multi-resource conflict detection ----
  const multiResourceConflicts = useMemo(() => {
    if (selectedResources.length <= 1) return new Map<string, string>();
    const conflictMap = new Map<string, string>();
    const typeToLabels = new Map<string, Set<string>>();
    selectedResources.forEach((r) => {
      const seen = new Set<string>();
      r.labels.forEach((lid) => {
        const label = getLabelById(lid);
        if (label) {
          if (!typeToLabels.has(label.type)) typeToLabels.set(label.type, new Set());
          typeToLabels.get(label.type)!.add(lid);
          seen.add(label.type);
        }
      });
      typeToLabels.forEach((_, type) => {
        if (!seen.has(type)) typeToLabels.get(type)!.add('__missing__');
      });
    });
    typeToLabels.forEach((labelIds, type) => {
      if (labelIds.size > 1) conflictMap.set(type, type);
    });
    return conflictMap;
  }, [selectedResources]);

  // ---- derived ----
  const isSingleResource = selectedResources.length === 1;
  const singleResource = isSingleResource ? selectedResources[0] : null;

  const checkedLabels = useMemo(
    () => availableLabels.filter((l) => pendingLabelIds.has(l.id)),
    [availableLabels, pendingLabelIds]
  );

  // Labels grouped by type for the pill picker, filtered by search query
  const groupedLabels = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = q
      ? availableLabels.filter((l) => l.name.toLowerCase().includes(q))
      : availableLabels;
    const groups = new Map<string, Label[]>();
    filtered.forEach((l) => {
      if (!groups.has(l.type)) groups.set(l.type, []);
      groups.get(l.type)!.push(l);
    });
    return groups;
  }, [availableLabels, searchQuery]);

  const labelMap = useMemo(
    () => new Map(availableLabels.map((l) => [l.id, l])),
    [availableLabels]
  );

  const changeSummary = useMemo(() => {
    const added: string[] = [];
    const removed: string[] = [];
    let unchanged = 0;
    pendingLabelIds.forEach((id) => {
      if (originalLabelIds.has(id)) unchanged++;
      else {
        const label = labelMap.get(id);
        if (label) added.push(label.name);
      }
    });
    originalLabelIds.forEach((id) => {
      if (!pendingLabelIds.has(id)) {
        const label = labelMap.get(id);
        if (label) removed.push(label.name);
      }
    });
    return { added, removed, unchanged, hasChanges: added.length > 0 || removed.length > 0 };
  }, [pendingLabelIds, originalLabelIds, labelMap]);

  const appliedCount = pendingLabelIds.size;
  const managedCount = availableLabels.filter((l) => !l.locked).length;

  // ---- handlers ----

  // Central label-change handler used by both the Selector and chip removal.
  // Enforces type-exclusivity and generates warnings.
  const handleLabelChange = useCallback(
    (newIds: string[]) => {
      const incoming = new Set(newIds);

      // Preserve locked labels — they can never be toggled via the Selector
      const lockedCurrentlyChecked = availableLabels
        .filter((l) => l.locked && pendingLabelIds.has(l.id))
        .map((l) => l.id);
      lockedCurrentlyChecked.forEach((id) => incoming.add(id));

      // Find what was added vs removed in this change
      const justAdded = newIds.filter((id) => !pendingLabelIds.has(id));

      let warning: string | null = null;

      // Enforce type-exclusivity: if a newly-added label shares a type with
      // an already-pending label, remove the old one and warn.
      const resolved = new Set(incoming);
      for (const addedId of justAdded) {
        const addedLabel = availableLabels.find((l) => l.id === addedId);
        if (!addedLabel) continue;
        const sameTypePrev = availableLabels.find(
          (l) => l.id !== addedId && l.type === addedLabel.type && resolved.has(l.id) && !l.locked
        );
        if (sameTypePrev) {
          resolved.delete(sameTypePrev.id);
          warning = `Selecting "${addedLabel.name}" will replace "${sameTypePrev.name}" (same type: ${addedLabel.type})`;
        }
      }

      // Warn when the last label of a type is being removed
      if (!warning) {
        const removedIds = Array.from(pendingLabelIds).filter((id) => !resolved.has(id));
        for (const removedId of removedIds) {
          const removedLabel = availableLabels.find((l) => l.id === removedId);
          if (!removedLabel || removedLabel.locked) continue;
          const remainingOfType = availableLabels.filter(
            (l) => l.type === removedLabel.type && resolved.has(l.id)
          );
          if (remainingOfType.length === 0) {
            warning = `Removing all ${removedLabel.type} labels from this resource`;
            break;
          }
        }
      }

      setPendingLabelIds(resolved);
      setActiveWarning(warning);
    },
    [availableLabels, pendingLabelIds]
  );

  const handleRemoveChip = useCallback(
    (labelId: string) => {
      const next = new Set(pendingLabelIds);
      next.delete(labelId);
      handleLabelChange(Array.from(next));
    },
    [pendingLabelIds, handleLabelChange]
  );

  const handleUndo = useCallback(() => {
    setPendingLabelIds(new Set(originalLabelIds));
    setActiveWarning(null);
  }, [originalLabelIds]);

  const handleSave = useCallback(() => {
    const resourceIds = selectedResources.map((r) => r.id);
    const labelIds = Array.from(pendingLabelIds);
    onSave(resourceIds, labelIds);
    onClose();
  }, [pendingLabelIds, selectedResources, onSave, onClose]);

  const handleStartCreate = useCallback(() => {
    setNewLabelName('');
    setNewLabelType('');
    setModalMode('creating');
  }, []);

  const handleCancelCreate = useCallback(() => {
    setModalMode('checklist');
    setNewLabelName('');
    setNewLabelType('');
  }, []);

  const handleCreate = useCallback(() => {
    const newLabel: Label = {
      id: `custom-${Date.now()}`,
      name: newLabelName.trim(),
      type: newLabelType as Label['type'],
      locked: false,
    };
    onCreateLabel(newLabel);
    // Auto-apply the new label, enforcing type-exclusivity
    const next = Array.from(pendingLabelIds);
    const sameTypePrev = availableLabels.find(
      (l) => l.type === newLabel.type && pendingLabelIds.has(l.id) && !l.locked
    );
    if (sameTypePrev) {
      next.splice(next.indexOf(sameTypePrev.id), 1);
    }
    next.push(newLabel.id);
    setPendingLabelIds(new Set(next));
    setActiveWarning(null);
    setModalMode('checklist');
    setNewLabelName('');
    setNewLabelType('');
  }, [newLabelName, newLabelType, pendingLabelIds, availableLabels, onCreateLabel]);

  // ---- guard ----
  if (selectedResources.length === 0) return null;

  // ---- render helpers ----

  const renderAppliedChips = () => {
    const chips: React.ReactNode[] = [];
    if (!isSingleResource) {
      multiResourceConflicts.forEach((_, type) => {
        chips.push(
          <Pill key={`conflict-${type}`} variant="warning" icon={null} showCloseButton={false}>
            Multiple {type} Labels
          </Pill>
        );
      });
    }
    checkedLabels.forEach((label) => {
      const pillType = LABEL_TYPE_TO_PILL_TYPE[label.type];
      chips.push(
        <Pill
          key={label.id}
          labelType={pillType}
          onClose={() => handleRemoveChip(label.id)}
          disabled={label.locked}
          showCloseButton={!label.locked}
        >
          {label.name}
        </Pill>
      );
    });
    if (chips.length === 0) return null;
    return (
      <div className={styles.chipsSection}>
        <PillGroup>{chips}</PillGroup>
      </div>
    );
  };

  const renderWarningBanner = () => {
    if (!activeWarning) return null;
    return (
      <div className={styles.warningBanner}>
        <span className={styles.warningIcon}>
          <Icon name="triangle-exclamation" size={16} />
        </span>
        <span>{activeWarning}</span>
      </div>
    );
  };

  const renderDiffPanel = () => {
    if (!changeSummary.hasChanges) return null;
    return (
      <div className={styles.diffPanel}>
        <span className={styles.diffPanelTitle}>Changes</span>
        {changeSummary.added.length > 0 && (
          <div className={styles.diffRow}>
            <span className={styles.diffAdded}>
              <Icon name="plus" size={12} />
              Adding
            </span>
            <PillGroup>
              {changeSummary.added.map((name) => (
                <Pill key={name} variant="default" icon={null} showCloseButton={false}>
                  {name}
                </Pill>
              ))}
            </PillGroup>
          </div>
        )}
        {changeSummary.removed.length > 0 && (
          <div className={styles.diffRow}>
            <span className={styles.diffRemoved}>
              <Icon name="minus" size={12} />
              Removing
            </span>
            <PillGroup>
              {changeSummary.removed.map((name) => (
                <Pill key={name} variant="warning" icon={null} showCloseButton={false}>
                  {name}
                </Pill>
              ))}
            </PillGroup>
          </div>
        )}
      </div>
    );
  };

  const renderCreateForm = () => (
    <div className={styles.createForm}>
      <p className={styles.createFormTitle}>Create New Label</p>
      <TextField
        label="Name"
        required
        value={newLabelName}
        onChange={(val) => setNewLabelName(val)}
        placeholder="Enter label name"
        autoFocus
      />
      <OptionSelector
        label="Type"
        required
        options={LABEL_TYPE_OPTIONS}
        value={newLabelType}
        onChange={(val) => setNewLabelType(val as string)}
        placeholder="Select a type"
      />
      <div className={styles.createFormActions}>
        <Button
          variant="primary"
          size="sm"
          onClick={handleCreate}
          disabled={!newLabelName.trim() || !newLabelType}
        >
          Create
        </Button>
        <Button variant="ghost" size="sm" onClick={handleCancelCreate}>
          Cancel
        </Button>
      </div>
    </div>
  );

  // ---- main render ----
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <ModalHeader title="Edit Labels" onClose={onClose} />

      <ModalBody>
        {/* 1. Bulk-edit info banner */}
        {!isSingleResource && (
          <div className={styles.bulkBanner}>
            <NotificationBanner
              status="info"
              title={`Changes will apply to all ${selectedResources.length} selected resources`}
              showCloseButton={false}
            />
          </div>
        )}

        {/* 2. Resource context */}
        <div className={styles.resourceContext}>
          {isSingleResource && singleResource ? (
            <>
              {singleResource.resource}{' '}
              <span style={{ color: 'var(--text-muted)' }}>({singleResource.resourceType})</span>
            </>
          ) : (
            <>Modify label assignments for {selectedResources.length} resources.</>
          )}
        </div>

        {/* 3. Applied label chips */}
        {renderAppliedChips()}

        {modalMode === 'checklist' ? (
          <>
            {/* 4. Pill picker */}
            <div className={styles.pillPicker}>
              {/* Search bar */}
              <div className={styles.pillPickerSearch}>
                <span className={styles.pillPickerSearchIcon}>
                  <Icon name="search" size={14} />
                </span>
                <input
                  className={styles.pillPickerSearchInput}
                  placeholder="Search labels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Groups */}
              <div className={styles.pillPickerBody}>
                {groupedLabels.size === 0 ? (
                  <span className={styles.pillPickerEmpty}>No labels found</span>
                ) : (
                  Array.from(groupedLabels.entries()).map(([type, labels]) => (
                    <div key={type} className={styles.pillPickerGroup}>
                      <span className={styles.pillPickerGroupLabel}>{type}</span>
                      <div className={styles.pillPickerGroupItems}>
                        {labels.map((label) => {
                          const isSelected = pendingLabelIds.has(label.id);
                          const pillType = LABEL_TYPE_TO_PILL_TYPE[label.type];
                          return (
                            <button
                              key={label.id}
                              type="button"
                              disabled={label.locked}
                              onClick={() =>
                                handleLabelChange(
                                  isSelected
                                    ? Array.from(pendingLabelIds).filter((id) => id !== label.id)
                                    : [...Array.from(pendingLabelIds), label.id]
                                )
                              }
                              className={styles.pillPickerItem}
                              title={label.locked ? 'System-managed — cannot be modified' : undefined}
                            >
                              <Pill
                                variant={isSelected ? 'default' : 'default'}
                                labelType={isSelected ? pillType : undefined}
                                icon={label.locked ? <Icon name="lock" size={10} /> : null}
                                showCloseButton={false}
                                disabled={label.locked}
                              >
                                {label.name}
                              </Pill>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Create action */}
              <div className={styles.pillPickerFooter}>
                <button
                  type="button"
                  className={styles.pillPickerCreate}
                  onClick={handleStartCreate}
                >
                  <Icon name="plus" size={13} />
                  Create new label
                </button>
              </div>
            </div>

            {/* 5. Warning banner */}
            {renderWarningBanner()}

            {/* 6. Diff panel */}
            {renderDiffPanel()}
          </>
        ) : (
          renderCreateForm()
        )}
      </ModalBody>

      <ModalFooter align="space-between">
        <span className={styles.footerLeft}>
          {appliedCount} labels applied &middot; {managedCount} managed
        </span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          {changeSummary.hasChanges && (
            <Button variant="outline" size="sm" onClick={handleUndo}>
              Undo Changes
            </Button>
          )}
          <Button variant="primary" size="sm" onClick={handleSave}>
            Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default EditLabelsModal;
