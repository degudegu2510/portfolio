import React from 'react';

interface MaterialSymbolsProps {
  children: string;
  fill?: boolean;
  className?: string;
  size?: number;
  [key: string]: any;
}

export const MaterialSymbols = ({
  children,
  fill = false,
  className = '',
  size = 24,
  ...props
}: MaterialSymbolsProps) => {

  const style: React.CSSProperties = {
    '--grad-value': 'light-dark(0, -25)',
    alignItems: 'center',
    display: 'flex',
    fontFamily: 'Material Symbols Rounded',
    fontSize: size,
    fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 300, 'GRAD' var(--grad-value), 'opsz' 24`,
    height: size,
    userSelect: 'none',
    width: size,
    ...props.style,
  };

  return (
    <span
      className={`material-symbols ${className}`}
      style={style}
      {...props}
    >
      {children}
    </span>
  );
};