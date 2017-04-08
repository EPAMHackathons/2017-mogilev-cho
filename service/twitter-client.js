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
            '22006510-BspwJ9QSOoLMHE0QRbveplcaIm0sEcxYvrdte5Ltr', //test user token
            'tf0ARtrwT8yLviXWHpEb63mhFvGxCV7OejmbGiV0Ma0x6', //test user secret
            function (e, data, res){
                if (e) console.error(e);
                callback(JSON.parse(data));
            });
    },
    searchTerm: function(queryText, callback) {
        oauth.get(
            'https://api.twitter.com/1.1/search/tweets.json?q=' + queryText,
            '22006510-BspwJ9QSOoLMHE0QRbveplcaIm0sEcxYvrdte5Ltr', //test user token
            'tf0ARtrwT8yLviXWHpEb63mhFvGxCV7OejmbGiV0Ma0x6', //test user secret
            function (e, data, res){
                if (e) console.error(e);
                callback(JSON.parse(data));
            });
    }
}

module.exports = twitter;