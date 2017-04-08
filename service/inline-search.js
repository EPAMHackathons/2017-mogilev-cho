const twit = require('./twitter-client')
var _ = require('underscore');

const service = {

    search: function(text) {

        //sss

        const tweets = [
            { id: '111111', text: 'aaa', imageUrl: 'https://pbs.twimg.com/media/C84YcrdXkAAmPYS.jpg', url: 'https://twitter.com/eurogamer/status/850657472994058241' },
            { id: '222222', text: 'vvv', imageUrl: 'https://pbs.twimg.com/media/C84YcrdXkAAmPYS.jpg', url: 'https://twitter.com/eurogamer/status/850657472994058241' }
        ]

        const results = tweets
            //.filter((country) => country.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
            .map((tweet) => {
                return {
                    id: tweet.id,
                    title: tweet.text,
                    type: 'article',
                    thumb_url: tweet.imageUrl,
                    thumb_width: 100,
                    thumb_height: 150,
                    input_message_content: {
                        message_text: `${tweet.text} code: *${tweet.url}*`,
                        parse_mode: 'Markdown'
                    }
                }
            })
        return results;
    }

}

module.exports = service