var crypto = require('crypto');
var redis = require("redis");
var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

//we set the root user credentials
client.set((process.env.adminname || 'admin'),
    crypto.createHash('md5').update(process.env.adminpassword || '1234').digest('hex'));

module.exports = client;

