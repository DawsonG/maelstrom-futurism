import { ColorSet, ThemeInterface } from "../interfaces";

export type ColorMode = "Light" | "Dark" | "User";

const defaultColors: ColorSet = {
  background: "#FFFFFF",
  content: "#FFFFFF",
  textColor: "#16191F",
  primary: "#88c0d0",
  secondary: "#B4B4B4",
  alert: "red",
  warning: "orange",
  success: "green",
  info: "lightblue"
}

class Theme {
  readonly colors: ColorSet;

  sizes = {
    base: "16px",
    sm: "0.707em",
    normal: "1em",
    md: "1.414em",
    lg: "2em",
    xl: "2.827em",
    xxl: "4em",
  };

  breakpoints = {
    xs: "0px",
    sm: "576px",
    md: "992px",
    lg: "1200px",
  };

  space = [0, 4, 8, 16, 24, 32, 40, 48, 64];

  colorsDark = {
    background: "#2e3440",
    backgroundPanel: "#3b4252",
    text: "#eceff4",
    interactable: "#3b4252",

    // temporary
    border: "#d8dee9",
    muted: "#707070",
    active: "#2196F3",

    primary: "#88c0d0",
  };

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
    return this.sizes[name as keyof typeof this.sizes];
  }

  color = (name: keyof typeof this.colors): string => this.colors[name];
  bp = (name: keyof typeof this.breakpoints): string => this.breakpoints[name];
  height = (name: string): string => this.heights[name as keyof typeof this.heights];

  constructor(themeConfig: ThemeInterface) {
    this.colors = themeConfig.colorSet || defaultColors;
  }
}

export default Theme;
