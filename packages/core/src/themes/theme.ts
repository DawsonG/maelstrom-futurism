export type ColorMode = "Light" | "Dark" | "User";

class Theme {
  private colorMode: ColorMode;

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

  colors = {
    trueWhite: "#FFFFFF",
    trueBlack: "#000000",
    font: "#16191F",
    border: "#B4B4B4",
    muted: "#707070",
    active: "#2196F3",

    primary: "#88c0d0",
  };

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

  colorsLight = {
    background: "",
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

  color = (name: string): string => {
    if (this.colorMode === "Light") {
      return this.colorsLight[name as keyof typeof this.colorsLight];
    } else /* if (this.colorMode === "Dark") */{
      return this.colorsDark[name as keyof typeof this.colorsDark];
    }
  };
  bp = (name: string): string => this.breakpoints[name as keyof typeof this.breakpoints];
  height = (name: string): string => this.heights[name as keyof typeof this.heights];

  constructor(colorMode: ColorMode) {
    this.colorMode = colorMode;
  }
}

export default Theme;
