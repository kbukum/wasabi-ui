const path = require("path");
const FileChanger = require("webpack-file-changer");
const package = require("../package.json");
const Utility = require("./util/Utility");

const paths = {
    app: path.resolve(Utility.projectDir, "wasabi-ui"),
    lib: path.resolve(Utility.projectDir, "lib"),
    site: path.resolve(Utility.projectDir, "site"),
    www: path.resolve(Utility.projectDir, "www"),
    static: path.resolve(Utility.projectDir, "static"),
    node_modules: path.resolve(Utility.projectDir, "node_modules")
};

paths.indexHtml = path.resolve(paths.www, "index.html");

const webpackConfig = {
    entry: paths.site ,
    output: {
        filename: "bundle.[hash].js",
        path: paths.www
    },
    context: paths.app,
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        alias: {
            "wasabi-ui/lib": paths.app,
            "wasabi-ui": paths.app,
        },
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"],
    },
    ts: {
        configFileName: "/config/config.build.ts.json"
    },
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
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
            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: [
    ]
};


const fileChanger = new FileChanger({
    move: [{
        from: paths.static,
        to: paths.www
    }, {
        from: paths.node_modules + "/bootstrap/dist",
        to: paths.www + "/bootstrap"
    }
    ],
    change: [{
        file: paths.indexHtml,
        parameters: {
            "bundle\\.\\[hash\\]": "bundle.[hash]",
            "\\$VERSION": package.version,
            "\\$BUILD_TIME": new Date()
        }
    }
    ]
});

webpackConfig.plugins.push(fileChanger);

module.exports = webpackConfig;