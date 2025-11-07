import { ColorSet, ThemeInterface } from "../interfaces";
import sass from '../styles/_exports.module.scss';

export type ColorMode = "Light" | "Dark" | "User";

class Theme {
  readonly colors: ColorSet;

  sizes = {
    base: sass.sizesBase,
    sm: sass.sizesSm,
    normal: sass.sizesNormal,
    md: sass.sizesMd,
    lg: sass.sizesLg,
    xl: sass.sizesXl,
    xxl: sass.sizesXxl,
  };

  breakpoints = {
    xs: sass.bpXs,
    sm: sass.bpSm,
    md: sass.bpMd,
    lg: sass.bpLg,
  };

  space = sass.spaces.split(', ');

  heights = {
    bottom: sass.heightBottom,
    low: sass.heightLow,
    sunk: sass.heightSunk,
    normal: sass.heightNormal,
    raised: sass.heightRaised,
    high: sass.heightHigh,
    top: sass.heightTop,
  };

  borderRadius = sass.borderRadius;
  inputRadius = sass.inputRadius;
  buttonRadius = sass.buttonRadius;

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
