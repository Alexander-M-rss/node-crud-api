const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = (env, argv) => {
  const mode = argv.mode || "development";
  return {
    entry: "./src/index.ts",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist/"),
    },
    mode,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    target: "node",
    plugins: [new ESLintPlugin(), new CleanWebpackPlugin()],
  };
};

module.exports = config;
