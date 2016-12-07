const path = require("path");
const Utility = require("./util/Utility");
const webpack = require('webpack');
const CopyWebpackPlugin = require("copy-webpack-plugin");
var WebpackNotifierPlugin = require('webpack-notifier');

const paths = {
    site: path.resolve(Utility.projectDir, "site"),
    app: path.resolve(Utility.projectDir, "src"),
    static: path.resolve(Utility.projectDir, "static")
}

const webpackConfig = {
    entry: paths.site,
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    context: paths.site,
    resolve: {
        alias: {
            "wasabi-ui": paths.app
        },
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    ts: {
        configFileName: "/config/config.dev.ts.json"
    },
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new WebpackNotifierPlugin({ alwaysNotify: true }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([{
                from: "../static"
            },
            {
                from: "../node_modules/bootstrap/dist",
                to: "./bootstrap"
            }
        ])
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        progress: true,
        inline: true,

        // display only errors to reduce the amount of output
        // stats: "errors-only",

        // parse host and port from env so this is easy
        // to customize
        // host: process.env.HOST,
        host: "0.0.0.0",
        port: process.env.PORT || 8080
    }

};

module.exports = webpackConfig;