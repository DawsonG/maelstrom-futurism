import { ColorSet, ThemeInterface } from '../interfaces';
import { SIZES, SPACES, BREAKPOINTS, HEIGHTS, RADII, LINE_HEIGHTS, LETTER_SPACINGS, BORDER_WIDTHS, FONTS } from '../tokens';

export type ColorMode = 'Light' | 'Dark' | 'User';

class Theme {
  readonly colors: ColorSet;

  sizes: Record<keyof typeof SIZES, string> = { ...SIZES };

  breakpoints = { ...BREAKPOINTS };

  space = [...SPACES];

  heights = { ...HEIGHTS };

  borderRadius: string = RADII.card;
  inputRadius: string = RADII.input;
  buttonRadius: string = RADII.button;
  pillRadius: string = RADII.pill;

  durations = {
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    ripple: '1000ms',
  };

  lineHeights: { tight: string; normal: string; relaxed: string } = { ...LINE_HEIGHTS };

  letterSpacings: { tight: string; normal: string; wide: string; display: string } = { ...LETTER_SPACINGS };

  borderWidths: { thin: string; medium: string; thick: string } = { ...BORDER_WIDTHS };

  fonts: { sans: string; display: string; mono: string } = { ...FONTS };

  navbarHeight: string = '60px';

  buttonSizes: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', { padding: string; fontSize: string }> = {
    xs: { padding: '2px 4px',    fontSize: '12px' },
    sm: { padding: '5px 10px',   fontSize: '14px' },
    md: { padding: '10px 20px',  fontSize: '16px' },
    lg: { padding: '20px 30px',  fontSize: '18px' },
    xl: { padding: '30px 40px',  fontSize: '20px' },
  };

  customColors: Record<string, string> = {};

  size(name: string): string {
    return this.sizes[name as keyof typeof this.sizes];
  }

  color = (name: keyof typeof this.colors): string => this.colors[name];
  custom = (name: string): string => this.customColors[name] ?? '';
  bp = (name: keyof typeof this.breakpoints): string => this.breakpoints[name];
  height = (name: string): string => this.heights[name as keyof typeof this.heights];

  constructor(themeConfig: ThemeInterface) {
    this.colors = themeConfig.colorSet;
  }
}

export default Theme;
