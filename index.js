const Telegraf = require('telegraf')
const msg = require('./messages')

const bot = require('./service/bot-engine')
const inlineSearch = require('./service/inline-search')

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

    //console.log('search twiter', results);
    inlineSearch.search(query, function(results) {
        return ctx.answerInlineQuery(results);
    });

})

app.on('message', (ctx) => {
    var resp = bot.analyze(ctx.message.text)
    if (resp.hasReply) {
        ctx.reply(resp.text)
    }
});

app.startPolling()