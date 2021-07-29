module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|js)x?$/i,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
        plugins: ["@emotion"]
      },
    },
  });
 
  config.resolve.extensions.push(".ts", ".tsx", ".json");
  return config;
};