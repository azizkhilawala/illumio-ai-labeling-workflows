'use client';

import { useCallback, useRef } from 'react';
import { useToast } from '@/design-system/components/Toast';
import type { SavePayload, SaveResult, DomainError } from './data';

type SaveOutcome = 'success' | 'partial' | 'failure' | 'domain';

const DEMO_SCENARIOS: SaveOutcome[] = ['success', 'success', 'success', 'partial', 'failure', 'domain'];

const SAMPLE_DOMAIN_ERRORS: DomainError[] = [
  {
    reason: 'Label is referenced by enforcement boundary',
    dependencies: [
      { name: 'API', href: '#enforcement-boundary-api' },
      { name: 'Web-Tier', href: '#enforcement-boundary-web-tier' },
    ],
    resourceNames: [],
  },
  {
    reason: 'Label still has an associated rule set',
    dependencies: [
      { name: 'strict-quarantine', href: '#ruleset-strict-quarantine' },
      { name: 'default-deny', href: '#ruleset-default-deny' },
    ],
    resourceNames: [],
  },
];

function simulateSave(payload: SavePayload): { result: SaveResult; domainErrors?: DomainError[] } {
  const scenario = DEMO_SCENARIOS[Math.floor(Math.random() * DEMO_SCENARIOS.length)];

  switch (scenario) {
    case 'partial': {
      const splitAt = Math.max(1, Math.floor(payload.resourceIds.length * 0.8));
      return {
        result: {
          status: 'partial',
          succeeded: payload.resourceIds.slice(0, splitAt),
          failed: payload.resourceIds.slice(splitAt),
        },
      };
    }
    case 'failure':
      return {
        result: {
          status: 'failure',
          succeeded: [],
          failed: payload.resourceIds,
          error: 'A server error occurred. Please try again.',
        },
      };
    case 'domain': {
      const splitAt = Math.max(1, Math.floor(payload.resourceIds.length * 0.6));
      const succeeded = payload.resourceIds.slice(0, splitAt);
      const failed = payload.resourceIds.slice(splitAt);
      const failedNames = failed.map(id => id.replace('res-', 'resource-'));
      const errors = SAMPLE_DOMAIN_ERRORS.map(e => ({
        ...e,
        resourceNames: failedNames,
      }));
      return {
        result: {
          status: 'failure',
          succeeded,
          failed,
        },
        domainErrors: errors,
      };
    }
    default:
      return {
        result: {
          status: 'success',
          succeeded: payload.resourceIds,
          failed: [],
        },
      };
  }
}

interface UseLabelSaveOptions {
  onSuccess: (resourceIds: string[], labelIds: string[]) => void;
  onRetryOpenModal: (resourceIds: string[], labelIds: string[]) => void;
  onDomainErrors: (errors: DomainError[], failedCount: number, succeededCount: number) => void;
}

export function useLabelSave({ onSuccess, onRetryOpenModal, onDomainErrors }: UseLabelSaveOptions) {
  const toast = useToast();
  const lastPayloadRef = useRef<SavePayload | null>(null);

  const save = useCallback(
    (payload: SavePayload) => {
      const executeSave = (currentPayload: SavePayload) => {
        lastPayloadRef.current = currentPayload;
        const { result, domainErrors } = simulateSave(currentPayload);
        const total = currentPayload.resourceIds.length;
        const isBulk = total > 1;

        if (domainErrors) {
          if (result.succeeded.length > 0) {
            onSuccess(result.succeeded, currentPayload.labelIds);
            toast.success(`Labels Updated on ${result.succeeded.length} Resources`);
          }
          onDomainErrors(domainErrors, result.failed.length, result.succeeded.length);
          return;
        }

        switch (result.status) {
          case 'success': {
            onSuccess(result.succeeded, currentPayload.labelIds);
            if (isBulk) {
              toast.success(`Labels Updated on ${total} Resources`);
            } else {
              toast.success('Labels Updated Successfully');
            }
            break;
          }

          case 'partial': {
            onSuccess(result.succeeded, currentPayload.labelIds);
            const failedCount = result.failed.length;
            const succeededCount = result.succeeded.length;
            toast.warning(
              `Labels Updated on ${succeededCount} of ${total} Resources`,
              {
                description: `${failedCount} resources could not be updated.`,
                action: {
                  label: `Retry ${failedCount} Failed`,
                  onClick: () => {
                    executeSave({ resourceIds: result.failed, labelIds: currentPayload.labelIds });
                  },
                },
                duration: 7000,
              }
            );
            break;
          }

          case 'failure': {
            const errorMsg = result.error || 'An unexpected error occurred. Please try again.';
            if (isBulk) {
              toast.error(`Label Update Failed for All ${total} Resources`, {
                description: errorMsg,
                action: {
                  label: 'Retry',
                  onClick: () => onRetryOpenModal(currentPayload.resourceIds, currentPayload.labelIds),
                },
                duration: 7000,
              });
            } else {
              toast.error('Label Update Failed', {
                description: errorMsg,
                action: {
                  label: 'Retry',
                  onClick: () => onRetryOpenModal(currentPayload.resourceIds, currentPayload.labelIds),
                },
                duration: 7000,
              });
            }
            break;
          }
        }
      };

      executeSave(payload);
    },
    [toast, onSuccess, onRetryOpenModal, onDomainErrors]
  );

  return { save };
}
