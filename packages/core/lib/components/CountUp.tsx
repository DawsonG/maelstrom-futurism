import {
  HTMLAttributes, ReactNode, useEffect, useRef, useState,
} from 'react';

export type CountUpProps = {
  /** The final number to count up (or down) to. */
  value: number;

  /** Animation duration in ms. Defaults to 1500. */
  duration?: number;

  /** The number counting starts from. Defaults to 0. */
  start?: number;

  /** Formats the displayed number at each animation frame. Defaults to
   *  `Math.round` + `toLocaleString()` for thousands separators. */
  formatter?: (n: number) => string;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

const defaultFormatter = (n: number) => Math.round(n).toLocaleString();

const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

export const CountUp = ({
  value, duration = 1500, start = 0, formatter = defaultFormatter, ...rest
}: CountUpProps): ReactNode => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const [display, setDisplay] = useState(start);

  useEffect(() => {
    if (!spanRef.current) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimated.current) return;
      hasAnimated.current = true;

      const startTime = performance.now();
      let frameId: number;

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuad(progress);
        setDisplay(start + (value - start) * eased);

        if (progress < 1) {
          frameId = requestAnimationFrame(tick);
        }
      };

      frameId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frameId);
    }, { threshold: 0 });

    observer.observe(spanRef.current);
    return () => observer.disconnect();
  }, [value, duration, start]);

  return (
    <span ref={spanRef} {...rest}>
      {formatter(display)}
    </span>
  );
};

export default CountUp;
