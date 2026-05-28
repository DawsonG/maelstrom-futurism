import { ReactNode, useEffect, useState } from 'react';

import styles from './styles.module.scss';
import ReadabilityBar, {
  FontOption,
  SpacingOption,
  READER_FONTS,
  SPACING,
} from './Readability/ReadabilityBar';

export enum StackType {
  SINGLE = 'single',
  STACK = 'stack',
  RANDOM_STACK = 'random_stack',
  NONE = 'none',
}
type Variant = 'single' | 'stack' | 'random_stack' | 'none' | StackType;

export enum HDirection {
  RIGHT = 'right',
  CENTER = 'center',
  LEFT = 'left',
}

export enum VDirection {
  TOP = 'top',
  BOTTOM = 'bottom',
}

export enum Background {
  NONE = 'none',
  GRAPH = 'graph',
  DOT = 'dot',
}
type BackgroundOptions = 'none' | 'graph' | 'dot' | Background;

export interface PaperProps {
  children: ReactNode;
  variant?: Variant;
  direction?: VDirection;
  background?: BackgroundOptions;
  width?: string;
  centered?: boolean;
  pre?: boolean;
  /** Explicit font-family override. When showReadabilityControls is true,
   *  this takes precedence over the reader's saved font preference. */
  font?: string;
  showReadabilityControls?: boolean;
}

// ─── Reader prefs (localStorage) ─────────────────────────────────────────────

const PREFS_KEY = 'mf-paper-prefs';

interface ReaderPrefs {
  font: FontOption;
  size: number;
  spacing: SpacingOption;
}

const DEFAULT_PREFS: ReaderPrefs = { font: 'serif', size: 18, spacing: 'normal' };

function loadPrefs(): ReaderPrefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    // ignore — SSR or private browsing
  }
  return { ...DEFAULT_PREFS };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Paper({
  children,
  variant,
  background,
  direction,
  width,
  centered,
  pre,
  font,
  showReadabilityControls = false,
}: PaperProps) {
  const [prefs, setPrefs] = useState<ReaderPrefs>(loadPrefs);

  // Persist reader prefs to localStorage whenever they change
  useEffect(() => {
    try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch { /* ignore */ }
  }, [prefs]);

  // ── outer (sheet) class list ──────────────────────────────────────────────
  const outerStyles = [styles.paper];
  if (centered) outerStyles.push(styles.centered);

  if (variant) {
    switch (variant) {
      case StackType.NONE:         outerStyles.push(styles.stackTypeNone);   break;
      case StackType.SINGLE:       outerStyles.push(styles.stackTypeSingle); break;
      case StackType.RANDOM_STACK: outerStyles.push(styles.stackTypeRandom); break;
      case StackType.STACK:
        outerStyles.push(direction === VDirection.TOP ? styles.stackTypeTop : styles.stackTypeBottom);
        break;
    }
  }

  // ── inner (content) class list + styles ──────────────────────────────────
  const innerStyles: string[] = [];
  if (background) {
    switch (background) {
      case Background.DOT:   innerStyles.push(styles.backgroundDotted); break;
      case Background.GRAPH: innerStyles.push(styles.backgroundGraph);  break;
    }
  }
  if (pre) innerStyles.push(styles.pre);

  // When the readability bar is shown the reader's prefs drive the type;
  // the explicit `font` prop acts as an author override that wins over prefs.
  const innerStyle = showReadabilityControls
    ? {
        fontFamily: font || READER_FONTS[prefs.font].stack,
        fontSize: prefs.size,
        lineHeight: SPACING[prefs.spacing].value,
      }
    : { fontFamily: font };

  return (
    <div className={styles.parent}>
      <div className={outerStyles.join(' ')} style={{ width }}>

        {showReadabilityControls && (
          <ReadabilityBar
            font={prefs.font}
            size={prefs.size}
            spacing={prefs.spacing}
            onFontChange={(f) => setPrefs(p => ({ ...p, font: f }))}
            onSizeChange={(s) => setPrefs(p => ({ ...p, size: s }))}
            onSpacingChange={(sp) => setPrefs(p => ({ ...p, spacing: sp }))}
          />
        )}

        <div className={innerStyles.join(' ')} style={innerStyle}>
          {children}
        </div>

      </div>
    </div>
  );
}
