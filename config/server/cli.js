const minimist = require("minimist");
const Server = require("./Server.js");

const options = minimist(process.argv.slice(2));
console.log(options);
const server = new Server(options);
server.listen(function () {
    console.log("Server started on console.");
});
