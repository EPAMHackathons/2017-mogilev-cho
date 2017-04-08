const Telegraf = require('telegraf')
const msg = require('./messages')

const bot = require('./service/bot-engine')

const app = new Telegraf('375464631:AAFxcfWfIamyDI9zlOI1ZHqsYNkVeUsCxrM')

app.command('start', (ctx) => {
    console.log('start', ctx.from)
    ctx.reply(msg.start)
})


app.command('search', (ctx) => {
    console.log('search', ctx.from)
    bot.search(ctx.message.text)
})

app.command('bantrend', (ctx) => {
    console.log('bantrend', ctx.from)
    bot.stopTrend(ctx.message.text)
})

//app.hears('hi', (ctx) => ctx.reply('Hey there!'))

//app.on('sticker', (ctx) => ctx.reply('👍'))

app.on('inline_query', (ctx) => {
    const query = ctx.inlineQuery.query || ''

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
                input_message_content: {
                    message_text: `${tweet.text} code: *${tweet.url}*`,
                    parse_mode: 'Markdown'
                }
            }
        })
    return ctx.answerInlineQuery(results)
})

app.on('message', (ctx) => {
    var resp = bot.analyze(ctx.message.text)
    if (resp.hasReply) {
        ctx.reply(resp.text)
    }
});

app.startPolling()