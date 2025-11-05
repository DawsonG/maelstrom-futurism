import { ColorSet, ThemeInterface } from "../interfaces";
import * as variables from '../../styles/_variables.scss';

export type ColorMode = "Light" | "Dark" | "User";

console.log(variables);

class Theme {
  readonly colors: ColorSet;

  sizes = {
    base: variables.sizesBase,
    sm: "0.707em",
    normal: "1em",
    md: "1.414em",
    lg: "2em",
    xl: "2.827em",
    xxl: variables.sizesXxl,
  };

  breakpoints = {
    xs: "0px",
    sm: "576px",
    md: "992px",
    lg: "1200px",
  };

  space = [0, 4, 8, 16, 24, 32, 40, 48, 64];

  heights = {
    "very low": "-1000",
    low: "-100",
    sunk: "-10",
    normal: "0",
    raised: "10",
    high: "100",
    "very high": "1000",
  };

  borderRadius = (): string => `${this.space[3]}px`;
  inputRadius = (): string => `${this.space[2]}px`;
  buttonRadius = (): string => `${this.space[2]}px`;

  size(name: string): string {
    console.log(variables)
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
