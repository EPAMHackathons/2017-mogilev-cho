const twit = require('./twitter-client')
var _ = require('underscore');

function toUnicode(text) {
    var result = "";
    for (var i = 0; i < text.length; i++) {
        result += "\\u" + ("000" + text[i].charCodeAt(0).toString(16)).substr(-4);
    }
    return result;
}
const service = {
    search: function(text, callback) {

        twit.searchTerm(text, function(data) {
            console.log(data);
            if (data && data.statuses && data.statuses.length > 0) {
                //console.log(data.statuses);
                var firstArray = data.statuses;
                if (data.statuses.length > 5) {
                    firstArray = data.statuses.slice(0, 5);
                }
                //.filter((country) => country.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
                const results = firstArray
                    .map((tweet) => {

                        var text = _.escape(tweet.user.name + ": " + tweet.text);
                        return {
                            id: "" + tweet.id,
                            title: text,
                            type: 'article',
                            thumb_url: tweet.user.profile_image_url_https,
                            input_message_content: {
                                message_text: text, //_.escape('${tweet.user.screen_name}: ${tweet.text}'),
                                parse_mode: 'Markdown'
                            }
                        }
                    })

                callback(results);
            } else {
                var results = [{
                    id: "1",
                    title: "Ничего не найдено",
                    type: 'article',
                    input_message_content: {
                        message_text: 'Ничего не найдено',
                        parse_mode: 'Markdown'
                    }
                }];
                callback(results);
            }
        });
    }
}

module.exports = service