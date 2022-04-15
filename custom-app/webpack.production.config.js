const path = require("path"); // can't use es-modules, always use commonjs
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // starting point
  // if multiple entries - specifying it in object
  entry: {
    // filename: path
    "hello-world": "./src/hello-world.js",
    panda: "./src/panda.js",
  },

  // output bundle config
  output: {
    // [name] - filename from entry object
    // [contenthash] - adds hash string calculated on file content to filename
    // [id] - internal chunk id
    filename: "[name].[contenthash].js",

    // should use absolute path
    path: path.resolve(__dirname, "./dist"),

    // specifies where assets located
    // can be relative, can be cdn url
    // slash at the end is required as webpack concatenated public path with asset path
    // default - auto
    publicPath: "",
  },
  mode: "production", // none/development/production mode of building bundle
  // optimization rules
  optimization: {
    // code-splitting settings
    splitChunks: {
      chunks: "all", // optimize all chunks
      minSize: 3000 // minimal size of dependency that will to be extracted, bytes (default - 30kb)
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        // sass-loader converts sass/scss to css
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
    // not required in production mode, as it is included by default
    // new TerserPlugin(),
    // extracts css to a separate file
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
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
    // if need N html-file, include HtmlWebpackPlugin N times
    new HtmlWebpackPlugin({
      filename: "hello-world.html",
      title: "Hello world", // html title tag
      template: "src/page-template.hbs",
      description: "Hello world",
      chunks: ["hello-world"], // provides a name of chunk to use, name is taken in entry point
      minify: false, // true by default in production mode
      // meta: {
      //   // meta tags
      //   description: "Some description",
      // },
    }),
    new HtmlWebpackPlugin({
      filename: "panda.html",
      title: "Hello Panda", // html title tag
      template: "src/page-template.hbs",
      description: "Panda",
      chunks: ["panda"],
      minify: false, // true by default in production mode
      // meta: {
      //   // meta tags
      //   description: "Some description",
      // },
    }),
  ],
};
