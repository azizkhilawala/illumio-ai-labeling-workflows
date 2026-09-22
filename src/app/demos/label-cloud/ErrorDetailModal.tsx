'use client';

import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/design-system/components/Modal';
import { Button } from '@/design-system/components/Button';
import { Icon } from '@/design-system/icons';
import type { DomainError } from './data';
import styles from './ErrorDetailModal.module.css';

interface ErrorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  errors: DomainError[];
  failedCount: number;
  succeededCount: number;
}

export const ErrorDetailModal: React.FC<ErrorDetailModalProps> = ({
  isOpen,
  onClose,
  errors,
  failedCount,
  succeededCount,
}) => {
  const isBulk = failedCount > 1;
  const title = isBulk
    ? `Unable to Update Labels on ${failedCount} Resources`
    : 'Unable to Update Labels';
  const subtitle = succeededCount > 0
    ? `${succeededCount} resource${succeededCount > 1 ? 's' : ''} updated successfully.`
    : undefined;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <ModalHeader title={title} onClose={onClose} />
      <ModalBody>
        {subtitle && (
          <p className={styles.subtitle}>{subtitle}</p>
        )}

        {!isBulk && errors.length > 0 && errors[0].resourceNames.length === 1 && (
          <div className={styles.resourceContext}>
            {errors[0].resourceNames[0]}
          </div>
        )}

        <div className={styles.errorList}>
          {errors.map((error, i) => (
            <div key={i} className={styles.errorGroup}>
              <div className={styles.errorHeader}>
                <span className={styles.errorIcon}>
                  <Icon name="circle-exclamation" variant="solid" size={18} color="var(--lightning-red-600, #C93734)" />
                </span>
                <span className={styles.errorReason}>{error.reason}:</span>
              </div>
              <ul className={styles.dependencyList}>
                {error.dependencies.map((dep, j) => (
                  <li key={j}>
                    <a href={dep.href} className={styles.dependencyLink}>
                      {dep.name}
                    </a>
                    {isBulk && error.resourceNames.length > 0 && (
                      <span className={styles.affectedResources}>
                        {' — '}
                        {error.resourceNames.join(', ')}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" size="sm" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
