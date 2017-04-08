const twit = require('./twitter-client')
var _ = require('underscore');

const service = {

    search: function(text, callback) {

        twit.searchTerm(text, function(data) {
            /*if (data.errors.length > 0) {

            } else */
            if (data.statuses && data.statuses.length > 0) {
                console.log(data.statuses[0]);
                const results = data.statuses
                    //.filter((country) => country.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
                    .map((tweet) => {
                        return {
                            id: "" + tweet.id,
                            title: tweet.user.name + "\n" + tweet.text,
                            type: 'article',
                            thumb_url: tweet.user.profile_image_url_https,
                            input_message_content: {
                                //message_text: twitUrl, //'aaaa', //`${tweet.text} \n *${twitUrl}*`,
                                message_text: `${tweet.user.screen_name}: ${tweet.text}`,
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