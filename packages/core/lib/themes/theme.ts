import { ColorSet, ThemeInterface } from "../interfaces";
import { SIZES, SPACES, BREAKPOINTS, HEIGHTS, RADII } from "../tokens";

export type ColorMode = "Light" | "Dark" | "User";

class Theme {
  readonly colors: ColorSet;

  sizes = { ...SIZES };

  breakpoints = { ...BREAKPOINTS };

  space = [...SPACES];

  heights = { ...HEIGHTS };

  borderRadius = RADII.card;
  inputRadius  = RADII.input;
  buttonRadius = RADII.button;
  pillRadius   = RADII.pill;

  size(name: string): string {
    return this.sizes[name as keyof typeof this.sizes];
  }

  color = (name: keyof typeof this.colors): string => this.colors[name];
  bp = (name: keyof typeof this.breakpoints): string => this.breakpoints[name];
  height = (name: string): string => this.heights[name as keyof typeof this.heights];

  constructor(themeConfig: ThemeInterface) {
    this.colors = themeConfig.colorSet;
  }
}

export default Theme;