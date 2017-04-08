const twit = require('./twitter-client')
const msg = require('../messages')
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

function buildMessage(topic, message) {
    var introText = msg.intros[_.random(0, msg.intros.length-1)];
    if (introText.includes('{}')) {
        introText = introText.replace('{}', topic);
    }
    return introText + message;
}

const service = {

    analyze: function(text) {

        var result = {
            hasReply: false,
            text: ''
        }

        var matchedTerm = _.find(_.allKeys(trendsMap), function(term) {
            return text.includes(term);
        });

        if (matchedTerm) {
            result.hasReply = true;
            result.text = buildMessage(matchedTerm, trendsMap[matchedTerm].url);
        }

        return result;
    },

    stopTrend: function(text) {

    },

    search: function(text) {

    }

}

module.exports = service