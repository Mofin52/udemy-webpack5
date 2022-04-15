const path = require("path"); // can't use es-modules, always use commonjs
// const TerserPlugin = require("terser-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // starting point
  entry: {
    "hello-world": "./src/hello-world.js",
    panda: "./src/panda.js",
  },

  // output bundle config
  output: {
    // [contenthash] - adds hash string calculated on file content to filename
    filename: "[name].bundle.js",

    // should use absolute path
    path: path.resolve(__dirname, "./dist"),

    // specifies where assets located
    // can be relative, can be cdn url
    // slash at the end is required as webpack concatenated public path with asset path
    // default - auto
    publicPath: "",
  },
  mode: "development", // none/development/production mode of building bundle
  // Development server config
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "./dist"), // directory from where serve files
    },
    devMiddleware: {
      index: "index.html", // file to serve
      writeToDisk: true, // by default result of build kept in memory, writeToDisk: true makes webpack to update output path directory
    },
  },
  module: {
    // rules of loading assets
    rules: [
      {
        // regex to check file
        test: /\.(png|jpe?g)$/,

        // type of asset
        // - asset/resource - generate file and place it near bundle
        // - asset/inline - inject file as base64 data-url into bundle
        // - asset/source - inject file in bundle as string
        // - asset - make webpack choose asset type, if file less than 8kb (default, can be changed) - it'll be inline, otherwise - resource
        type: "asset/resource",
        parser: {
          // condition under which asset will considered as inline ones if general asset resourse type provided
          dataUrlCondition: {
            maxSize: 3 * 1024, // bytes
          },
        },
      },
      {
        test: /\.txt$/,
        type: "asset/source",
      },
      // {
      //   test: /\.css$/,
      //   // 'use' key allows to use multiple loaders
      //   // css-loader reads and returns css-file
      //   // style-loader injects it into page with <style> tag
      //   // loaders should be installed
      //   use: ["style-loader", "css-loader"],
      // },
      // {
      //   test: /\.scss$/,
      //   // sass-loader converts sass/scss to css
      //   use: ["style-loader", "css-loader", "sass-loader"],
      // },
      {
        test: /\.css$/,
        // 'use' key allows to use multiple loaders
        // css-loader reads and returns css-file
        // MiniCssExtractPlugin extracts css to a separate file
        // loaders should be installed
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        // sass-loader converts sass/scss to css
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // @babel/env converts latest js to es5
            presets: ["@babel/env"],
            // @babel/plugin-proposal-class-properties add support of class properties
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  // plugins - libraries to modify bundle in dirrerent ways
  plugins: [
    // minifies bundle, in webpack 5 comes out of the box
    // new TerserPlugin(),
    // extracts css to a separate file
    // new MiniCssExtractPlugin({
    //   filename: "styles.[contenthash].css",
    // }),
    // cleans output path folder before each build
    new CleanWebpackPlugin({
      // specify additional paths to clean, path relative to dist directory
      cleanAfterEveryBuildPatterns: [
        "**/*", // default pattern, removes all the files and folders within output directory
        path.join(process.cwd(), "build/**/*"), // if it out of the output, should specify absolute path
      ],
    }),
    // updated script and css references in html file automaticaly on build
    // generates html file to output directory
    new HtmlWebpackPlugin({
      filename: "hello-world.html",
      chunks: ["hello-world"],
      title: "Hello world", // html title tag
      template: "src/page-template.hbs",
      description: "Some description",
      // meta: {
      //   // meta tags
      //   description: "Some description",
      // },
    }),
    new HtmlWebpackPlugin({
      filename: "panda.html",
      chunks: ["panda"],
      title: "Panda", // html title tag
      template: "src/page-template.hbs",
      description: "Some description of Panda",
      // meta: {
      //   // meta tags
      //   description: "Some description",
      // },
    }),
  ],
};
