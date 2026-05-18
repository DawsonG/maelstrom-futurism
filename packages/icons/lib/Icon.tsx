import { HTMLAttributes, Suspense, useMemo } from 'react';

import { icons } from './icons';

export type IconName = keyof typeof icons;

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  icon: IconName;
  size?: number;
  className?: string;
  rotate?: number;
}

/**
 *
 * @param icon string key icon name
 * @param className string classes for styling
 * @param rotate optional number rotation of the icon
 * @returns Icon react component
 */
export const Icon = ({ icon, size = 24, className, rotate, color, ...rest }: IconProps) => {
  const SvgIcon = useMemo(() => icons[icon], [icon]);

  if (!SvgIcon) return null;

  return (
    <div
      className={className}
      aria-label={icon}
      role="img"
      style={{
        height: `${size}px`,
        width: `${size}px`,
        padding: '2px',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        color,
      }}
      {...rest}
    >
      <Suspense fallback={null}>
        {/* @ts-expect-error Server Component */}
        <SvgIcon style={{ width: '100%', height: '100%' }} />
      </Suspense>
    </div>
  );
};
