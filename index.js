BOT_TOKEN_DEV='375464631:AAFxcfWfIamyDI9zlOI1ZHqsYNkVeUsCxrM'

const { Composer, Markup } = require('micro-bot')


const msg = require('./messages')



const app = new Composer()



app.command('start', (ctx) =>

    ctx.replyWithMarkdown(msg.start, Markup

        .keyboard([['так', 'ишо']])

        .resize()

        .extra()

    )

)

app.command('help', ctx => ctx.replyWithMarkdown(msg.help))

app.hears(/(так)|(ишо)/i, ctx => ctx.replyWithMarkdown("hello"))



module.exports = app