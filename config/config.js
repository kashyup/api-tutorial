const env = require("./env.json");

exports.config = function() {
    const node_env = process.env.NODE_ENV||"dev";
    return env[node_env];
}
