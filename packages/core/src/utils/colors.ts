type TColor = {
  r: number;
  g: number;
  b: number;
};

export const isValidHex = (hex: string) => /^#(([0-9A-Fa-f]{2}){3,4}|[0-9A-Fa-f]{3})$/.test(hex);

export const formatStringAsHexColor = (color: string) => {
  let finalColor = color.startsWith('#') ? color : `#${color}`;
  if (!isValidHex(finalColor)) 
    throw new Error(`${color} cannot be made into a valid color hex code`);

  return finalColor;
};

export const hexToDecimal = (color: string): TColor => {
  let trimmedColor = color;
  if (trimmedColor.startsWith("#")) {
    trimmedColor = color.substring(1);
  }
  const rgb = [
    trimmedColor.substring(0, 2),
    trimmedColor.substring(2, 4),
    trimmedColor.substring(4, 6),
  ];

  return {
    r: parseInt(rgb[0], 16),
    g: parseInt(rgb[1], 16),
    b: parseInt(rgb[2], 16),
  };
};

export const decimalToHex = (num: number) => {
  return num.toString(16);
}

export const brightness = (color: string) => {
  const { r, g, b } = hexToDecimal(color);

  return (r * 299 + g * 587 + b * 114) / 1000;
};

export const lightenDarkenColor = (color: string, amount: number) => {
  if (color[0] == "#") {
    color = color.slice(1);
  }

  var num = parseInt(color, 16);

  var r = (num >> 16) + amount;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amount;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amount;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return "#" + (g | (b << 8) | (r << 16)).toString(16);
};
