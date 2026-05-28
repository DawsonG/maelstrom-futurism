import { ReactElement } from 'react';

import styles from './ReadabilityBar.module.scss';

export type FontOption = 'serif' | 'sans' | 'dyslexic';
export type SpacingOption = 'tight' | 'normal' | 'loose';

export const READER_FONTS: Record<FontOption, { label: string; stack: string }> = {
  serif:    { label: 'Serif',    stack: 'Georgia, "Iowan Old Style", "Palatino Linotype", "Times New Roman", serif' },
  sans:     { label: 'Sans',     stack: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' },
  dyslexic: { label: 'Dyslexic', stack: '"OpenDyslexic", "Comic Sans MS", "Segoe UI", sans-serif' },
};

export const SPACING: Record<SpacingOption, { label: string; value: number; gap: number }> = {
  tight:  { label: 'Tight',  value: 1.4, gap: 2 },
  normal: { label: 'Normal', value: 1.7, gap: 4 },
  loose:  { label: 'Loose',  value: 2.1, gap: 6 },
};

export const SIZE_MIN = 14;
export const SIZE_MAX = 28;
export const SIZE_STEP = 2;

interface StackGlyphProps {
  gap: number;
}

const StackGlyph = ({ gap }: StackGlyphProps): ReactElement => (
  <span className={styles.stackGlyph} style={{ gap: `${gap}px` }} aria-hidden="true">
    <i className={styles.stackLine} />
    <i className={styles.stackLine} />
    <i className={styles.stackLine} />
  </span>
);

export interface ReadabilityBarProps {
  font: FontOption;
  size: number;
  spacing: SpacingOption;
  onFontChange: (font: FontOption) => void;
  onSizeChange: (size: number) => void;
  onSpacingChange: (spacing: SpacingOption) => void;
}

const ReadabilityBar = ({
  font,
  size,
  spacing,
  onFontChange,
  onSizeChange,
  onSpacingChange,
}: ReadabilityBarProps): ReactElement => {
  return (
    <div className={styles.readabilityBar} role="group" aria-label="Reading preferences">

      {/* Font family */}
      <div className={styles.group}>
        <span className={styles.label}>Font</span>
        <div className={styles.seg}>
          {(Object.entries(READER_FONTS) as [FontOption, { label: string; stack: string }][]).map(([key, f]) => (
            <button
              key={key}
              type="button"
              aria-pressed={font === key}
              onClick={() => onFontChange(key)}
              style={{ fontFamily: f.stack }}
              className={styles.segButton}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Text size */}
      <div className={styles.group}>
        <span className={styles.label}>Size</span>
        <div className={styles.step}>
          <button
            type="button"
            className={`${styles.stepButton} ${styles.sm}`}
            onClick={() => onSizeChange(Math.max(SIZE_MIN, size - SIZE_STEP))}
            disabled={size <= SIZE_MIN}
            aria-label="Decrease text size"
          >
            A
          </button>
          <span className={styles.stepVal}>{size}px</span>
          <button
            type="button"
            className={`${styles.stepButton} ${styles.lg}`}
            onClick={() => onSizeChange(Math.min(SIZE_MAX, size + SIZE_STEP))}
            disabled={size >= SIZE_MAX}
            aria-label="Increase text size"
          >
            A
          </button>
        </div>
      </div>

      {/* Line spacing */}
      <div className={styles.group}>
        <span className={styles.label}>Spacing</span>
        <div className={styles.seg}>
          {(Object.entries(SPACING) as [SpacingOption, { label: string; value: number; gap: number }][]).map(([key, s]) => (
            <button
              key={key}
              type="button"
              aria-pressed={spacing === key}
              onClick={() => onSpacingChange(key)}
              title={`${s.label} line spacing`}
              aria-label={`${s.label} line spacing`}
              className={styles.segButton}
            >
              <StackGlyph gap={s.gap} />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ReadabilityBar;
