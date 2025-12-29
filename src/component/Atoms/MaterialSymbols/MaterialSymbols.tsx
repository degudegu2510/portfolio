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
    alignItems: 'center',
    display: 'inline-flex',
    fontFamily: 'Material Symbols Rounded',
    fontSize: size,
    fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
    height: size,
    userSelect: 'none',
    width: size,

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