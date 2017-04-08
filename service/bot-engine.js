const twit = require('./twitter-client')
var _ = require('underscore');

var trends = null;
var trendsMap = {};

twit.getTrends(function(data) {
    if (data && data.length) {
        var trends = data[0].trends;
        _.each(trends, function(trend) {
            var key = trend.name.replace('#', '');
            trendsMap[key] = trend;
        })
    }
});

const service = {

    analyze: function(text) {

        var result = {
            hasReply: true,
            text: ''
        }

        var matchedTerm = _.find(_.allKeys(trendsMap), function(term) {
            return text.includes(term);
        });

        if (matchedTerm) {
            result.hasReply = true;
            result.text = trendsMap[matchedTerm].url
        }

        return result;
    },

    stopTrend: function(text) {

    },

    search: function(text) {

    }

}

module.exports = service