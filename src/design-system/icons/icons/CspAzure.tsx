import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CspAzure: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><path d="M8.05601 4.5086H11.5083L7.92449 15.127C7.84896 15.3507 7.63916 15.5014 7.40303 15.5014H4.71631C4.53929 15.5014 4.3731 15.4162 4.26985 15.2724C4.1666 15.1286 4.13892 14.9439 4.19551 14.7762L7.53442 4.88302C7.60992 4.6592 7.81979 4.50847 8.05601 4.50847V4.5086Z" fill="url(#paint0_linear_4167_1145)"/>
<path d="M13.0727 11.6307H7.59819C7.49403 11.6306 7.40042 11.6942 7.36221 11.7911C7.32399 11.888 7.34897 11.9984 7.42516 12.0694L10.9429 15.3528C11.0454 15.4483 11.1802 15.5014 11.3203 15.5014H14.4201L13.0727 11.6307Z" fill="#0078D4"/>
<path d="M8.05615 4.50863C7.81712 4.50771 7.60528 4.66239 7.53336 4.89034L4.19976 14.7672C4.13934 14.9356 4.16479 15.1229 4.26794 15.269C4.37109 15.4152 4.539 15.5019 4.7179 15.5015H7.47397C7.68294 15.4641 7.85567 15.3172 7.92608 15.117L8.59087 13.1577L10.9655 15.3726C11.065 15.4549 11.1898 15.5004 11.319 15.5015H14.4073L13.0528 11.6307L9.10424 11.6317L11.5209 4.50863H8.05615Z" fill="url(#paint1_linear_4167_1145)"/>
<path d="M12.4654 4.8825C12.39 4.65903 12.1805 4.50861 11.9446 4.50861H8.09711C8.33294 4.50861 8.54248 4.65906 8.6179 4.8825L11.9569 14.7761C12.0136 14.9438 11.9859 15.1286 11.8827 15.2724C11.7794 15.4163 11.6132 15.5016 11.4361 15.5016H15.2838C15.4608 15.5016 15.627 15.4162 15.7302 15.2724C15.8334 15.1285 15.8611 14.9438 15.8045 14.7761L12.4654 4.8825Z" fill="url(#paint2_linear_4167_1145)"/>
<defs>
<linearGradient id="paint0_linear_4167_1145" x1="8.49615" y1="5.32321" x2="5.11507" y2="15.3118" gradientUnits="userSpaceOnUse">
<stop stopColor="#114A8B"/>
<stop offset="1" stopColor="#0669BC"/>
</linearGradient>
<linearGradient id="paint1_linear_4167_1145" x1="10.2826" y1="10.2593" x2="9.55173" y2="10.5064" gradientUnits="userSpaceOnUse">
<stop stopOpacity="0.3"/>
<stop offset="0.071" stopOpacity="0.2"/>
<stop offset="0.321" stopOpacity="0.1"/>
<stop offset="0.623" stopOpacity="0.05"/>
<stop offset="1" stopOpacity="0"/>
</linearGradient>
<linearGradient id="paint2_linear_4167_1145" x1="10.9811" y1="5.01429" x2="14.6713" y2="14.8458" gradientUnits="userSpaceOnUse">
<stop stopColor="#3CCBF4"/>
<stop offset="1" stopColor="#2892DF"/>
</linearGradient>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('csp-azure', CspAzure);
