import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const NfcSymbol: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><path d="M8 18.9297C5.60879 17.5465 4 14.9611 4 12C4 9.03886 5.60879 6.45348 8 5.07025L14 10.9999M16 4.99988C18.3912 6.38312 20 8.96849 20 11.9296C20 14.8908 18.3912 17.4761 16 18.8594L10 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M15.1344 4.49917C15.4109 4.0211 16.0227 3.85774 16.5007 4.13429C19.1882 5.68892 21 8.5971 21 11.9296C21 15.2622 19.1882 18.1704 16.5007 19.725C16.1125 19.9496 15.6222 19.8882 15.3013 19.5748L9.30133 13.7154C8.9062 13.3296 8.89869 12.6965 9.28456 12.3013C9.67043 11.9062 10.3035 11.8987 10.6987 12.2846L16.1263 17.5849C17.8699 16.3105 19 14.2516 19 11.9296C19 9.3399 17.5942 7.07734 15.4993 5.8655C15.0212 5.58895 14.8579 4.97723 15.1344 4.49917ZM7.49927 4.20465C7.88943 3.97896 8.38234 4.04217 8.70293 4.359L14.7029 10.2887C15.0957 10.6769 15.0995 11.3101 14.7113 11.7029C14.323 12.0957 13.6899 12.0994 13.2971 11.7112L7.86983 6.34757C6.12841 7.62221 5 9.6798 5 12C5 14.5897 6.40581 16.8523 8.50073 18.0641C8.97879 18.3407 9.14215 18.9524 8.86561 19.4305C8.58906 19.9085 7.97733 20.0719 7.49927 19.7954C4.81178 18.2407 3 15.3325 3 12C3 8.66747 4.81178 5.75929 7.49927 4.20465Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('nfc-symbol', NfcSymbol);
