const env = require("./env.json");

exports.config = function() {
    const node_env = process.argv[2];
    return env[node_env];
}
