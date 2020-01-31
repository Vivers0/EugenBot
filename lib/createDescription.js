

module.exports.run = async (client, message, args) => {
    Mongo.connect(url, (err, client) => {
        assert.equal(null, err);
        console.log("Successfully connected!");
    });
}

module.exports.help = {
    "name": 'crdr'
}