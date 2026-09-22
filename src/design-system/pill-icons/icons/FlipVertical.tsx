import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const FlipVertical: React.FC<PillIconComponentProps> = ({
  size = 18,
  bgColor = 'var(--lightning-bluegray-600)',
  iconColor = 'var(--lightning-contrast-white)',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`ds-pill-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="9" cy="9" r="9" fill={bgColor} />
      {/* Icon content */}
      <g >
<path d="M11.1334 14.2977L14.2267 11.2044C14.2622 11.1688 14.2622 11.0977 14.2622 11.0622C14.2267 11.0266 14.1911 10.9911 14.12 10.9911H12.6267V7.86217C12.6267 7.71995 12.52 7.61328 12.3778 7.61328H9.64002C9.49779 7.61328 9.39113 7.71995 9.39113 7.86217V10.9911H7.93335C7.86224 10.9911 7.82668 11.0266 7.79113 11.0622C7.75557 11.0977 7.79113 11.1688 7.82668 11.2044L10.92 14.2977C10.9556 14.3333 10.9911 14.3333 11.0267 14.3333C11.0622 14.3333 11.0978 14.3333 11.1334 14.2977Z" fill={iconColor}/>
<path d="M6.86665 3.70218L3.77332 6.79552C3.73776 6.83107 3.73776 6.90218 3.73776 6.93774C3.77332 6.9733 3.80887 7.00885 3.87998 7.00885H5.37332V10.1377C5.37332 10.28 5.47999 10.3866 5.62221 10.3866H8.35999C8.50221 10.3866 8.60888 10.28 8.60888 10.1377V7.00885H10.0667C10.1378 7.00885 10.1733 6.9733 10.2089 6.93774C10.2444 6.90218 10.2089 6.83107 10.1733 6.79552L7.07999 3.70218C7.04443 3.66663 7.00888 3.66663 6.97332 3.66663C6.93777 3.66663 6.90221 3.66663 6.86665 3.70218Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('flip-vertical', FlipVertical);
