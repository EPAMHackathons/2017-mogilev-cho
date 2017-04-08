const twit = require('./twitter-client')

var trends = null;

twit.getTrends(function(data) {
    if (data && data.length) {
        trends = data[0].trends;
    }
});

const service = {

    analyze: function(text) {
        return {
            hasReply: true,
            text: text
        }
    },

    stopTrend: function(text) {

    },

    search: function(text) {

    }

}

module.exports = service