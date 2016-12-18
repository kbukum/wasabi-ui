const path = require("path");
const Utility = require("./util/Utility");
const webpack = require('webpack');
const CopyWebpackPlugin = require("copy-webpack-plugin");
var WebpackNotifierPlugin = require('webpack-notifier');

const paths = {
    site: path.resolve(Utility.projectDir, "site"),
    app: path.resolve(Utility.projectDir, "wasabi-ui"),
    static: path.resolve(Utility.projectDir, "static")
};

const webpackConfig = {
    entry: paths.site,
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    context: paths.site,
    resolve: {
        root: [paths.site, paths.app],
        alias: {
            "wasabi-ui/lib": paths.app,
            "wasabi-ui": paths.app,
        },
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"]
    },
    ts: {
        configFileName: "/config/config.dev.ts.json"
    },
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: 'ts-loader'},
            {
                /**
                 * @link https://github.com/webpack/json-loader
                 * npm install json-loader --save-dev
                 */
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.s?css$/,
                loader: "style-loader!css-loader"
            },
            {
                /**
                 * @link https://github.com/webpack/file-loader
                 * npm install file-loader --save-dev
                 */
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: "file-loader",
                include: /fonts/
            }
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
                from: "../static/index_dev.html",
                to: "../index.html"
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