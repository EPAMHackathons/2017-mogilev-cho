var OAuth = require('oauth');

var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'J2MoNIywlF86bZcML9A8g7iRm',
    'v6PyJ70fF7Nsq28iFQ0H3AETkGF7XQz3nKhwmnEYdERDHOhy4F',
    '1.0A',
    null,
    'HMAC-SHA1'
);

var twitter = {
    getTrends: function(callback) {
        oauth.get(
            'https://api.twitter.com/1.1/trends/place.json?id=23424936',
            '22006510-gJs9qdtPiUSrsbLFz5P3zzQ7fIbpXeRhEN0vHTOwi', //test user token
            'ofkkIgSgLWoSL0VGpq9pzRDtuidtVEhrsyHlDsXmOwHL3', //test user secret
            function(e, data, res) {
                if (e) console.error(e);
                callback(JSON.parse(data));
            });
    },
    searchTerm: function(queryText, callback) {
        oauth.get(
            'https://api.twitter.com/1.1/search/tweets.json?q=' + encodeURIComponent(queryText),
            '22006510-gJs9qdtPiUSrsbLFz5P3zzQ7fIbpXeRhEN0vHTOwi', //test user token
            'ofkkIgSgLWoSL0VGpq9pzRDtuidtVEhrsyHlDsXmOwHL3', //test user secret
            function(e, data, res) {
                if (e) {
                    console.error(e);
                    console.log(data);
                    callback(null);
                } else {
                    console.log(data);
                    callback(JSON.parse(data));
                }
            });
    }
}

module.exports = twitter;