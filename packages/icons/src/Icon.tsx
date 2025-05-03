import { HTMLAttributes, Suspense, useMemo } from "react";

import { icons } from "./icons";

export type IconName = keyof typeof icons;

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  icon: IconName;
  className?: string;
  // These props make styling component easier than creating new classes
  rotate?: number;
}

/**
 *
 * @param icon string key icon name
 * @param className string classes for styling
 * @param rotate optional number rotation of the icon
 * @returns Icon react component
 */
export const Icon = ({ icon, className, rotate, color, ...rest }: IconProps) => {
  const SvgIcon = useMemo(() => icons[icon], [icon]);

  if (!SvgIcon) return null;

  return (
    <div
      className={className}
      aria-label={icon}
      role="img"
      style={{
        height: "24px",
        width: "24px",
        padding: "2px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
      {...rest}
    >
      <Suspense fallback={null}>
        {/* @ts-expect-error Server Component */}
        <SvgIcon style={{ width: "100%", height: "100%" }} />
      </Suspense>
    </div>
  );
};
