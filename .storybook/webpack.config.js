module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve("babel-loader")
      },
      {
        loader: require.resolve("awesome-typescript-loader"),
        options: {
          noUnusedLocals: false
        }
      },
      {
        loader: require.resolve("@storybook/addon-storysource/loader"),
        options: {
          parser: "typescript"
        }
      }
    ]
  });

  config.module.rules.push({
    test: /\.stories\.(tsx)$/,
    loaders: [
      {
        loader: require.resolve("@storybook/source-loader"),
        options: {
          parser: "typescript",
          prettierConfig: {
            semi: true,
            singleQuote: true,
            jsxSingleQuote: false,
            useTabs: false,
            tabWidth: 2,
            trailingComma: "all",
            printWidth: 80,
            arrowParens: "always"
          }
        }
      }
    ],
    enforce: "pre"
  });

  config.resolve.extensions.push(".ts", ".tsx", ".json");
  return config;
};
