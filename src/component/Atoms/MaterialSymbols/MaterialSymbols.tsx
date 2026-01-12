import React from 'react';

interface MaterialSymbolsProps {
  children: string;
  fill?: boolean;
  className?: string;
  size?: 12 | 14 | 16 | 20 | 24 | 28 | 32 | 48;
  [key: string]: any;
}

export const MaterialSymbols = ({
  children,
  fill = false,
  className = '',
  size = 24,
  ...props
}: MaterialSymbolsProps) => {

  const relativeSize = {
    48: '2.5rem',
    32: '2rem',
    28: '1.5rem',
    24: '1.25rem',
    20: '1.125rem',
    16: '1rem',
    14: '0.875rem',
    12: '0.75rem'
  }

  const style: React.CSSProperties = {
    alignItems: 'center',
    display: 'inline-flex',
    fontFamily: 'Material Symbols Rounded',
    fontSize: relativeSize[size],
    fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
    height: relativeSize[size],
    userSelect: 'none',
    width: relativeSize[size],

    ...props.style,
  };

  return (
    <span
      className={`material-symbols-rounded ${className}`}
      style={style}
      {...props}
    >
      {children}
    </span>
  );
};