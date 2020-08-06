class Theme {
  sizes = {
    base: "16px",
    sm: "0.707em",
    normal: "1em",
    md: "1.414em",
    lg: "2em",
    xl: "2.827em",
    xxl: "4em"
  };

  breakpoints = {
    xs: "0px",
    sm: "576px",
    md: "992px",
    lg: "1200px"
  };

  space = [0, 4, 8, 16, 24, 32, 40, 48, 64];

  colors = {
    trueWhite: "#FFFFFF",
    font: "#16191F",
    border: "#B4B4B4",
    muted: "#707070",
    active: "#2196F3"
  };

  heights = {
    "very low": "-1000",
    low: "-100",
    sunk: "-10",
    normal: "0",
    raised: "10",
    high: "100",
    "very high": "1000"
  };

  borderRadius = `${this.space[1]}px`;

  size = (name: string) => this.sizes[name];
  color = (name: string) => this.colors[name];
  bp = (name: string) => this.breakpoints[name];
  height = (name: string) => this.heights[name];
}

export default new Theme();
