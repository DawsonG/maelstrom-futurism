export const hexToDecimal = color => {
  let trimmedColor = color;
  if (trimmedColor.startsWith("#")) {
    trimmedColor = color.substring(1);
  }
  const rgb = [
    trimmedColor.substr(0, 2),
    trimmedColor.substr(2, 2),
    trimmedColor.substr(4, 2)
  ];

  return {
    r: parseInt(rgb[0], 16),
    g: parseInt(rgb[1], 16),
    b: parseInt(rgb[2], 16)
  };
};

export const brightness = color => {
  const { r, g, b } = hexToDecimal(color);

  return (r * 299 + g * 587 + b * 114) / 1000;
};

export const lightenDarkenColor = (color, amount) => {
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
