const { Composer, Markup } = require('micro-bot')

const msg = require('./messages')

const bot = require('./service/bot-engine')

const twit = require('./service/twitter-client')

const app = new Composer()

app.command('start', (ctx) =>

    ctx.replyWithMarkdown(msg.start, Markup

        .keyboard([['так', 'ишо']])

        .resize()

        .extra()

    )

)

app.command('help', ctx => ctx.replyWithMarkdown(msg.help))

app.on('message', (ctx) => {
    ctx.replyWithMarkdown('че?\n' + ctx.message)
});

app.on('sticker', (ctx) => ctx.reply('👍'))

app.hears(/(так)|(ишо)/i, ctx => {
    console.log()
    ctx.replyWithMarkdown("ну так-и да")
});

module.exports = app