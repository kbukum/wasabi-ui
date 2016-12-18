const Utility = require("../util/Utility");
const path = require("path");
const jsonServer = require("json-server");
const defaultPort = 3000;

const Server = function Server(options) {
    if(!options.routes) {
        options.routes = [];
    }
    if(options.r) {
        options.routes.push(options.r);
    }

    // server.js
    const server = jsonServer.create();

    const router = jsonServer.router(path.join(Utility.projectDir, options.r));

    const middlewares = jsonServer.defaults();

    server.use(middlewares);
    // In this example, returned resources will be wrapped in a body property

    server.use((req, res, next) => {
        res.setHeader("X-Total-Count", 5);
        next();
    });

    server.use(router);

    return {
        listen: (callback) => {
            server.listen(options.p || defaultPort, function () {
                console.log("JSON Server is running on " + options.p);
                if(callback) {
                    callback();
                }
            });
        }
    }
};

module.exports = Server;
