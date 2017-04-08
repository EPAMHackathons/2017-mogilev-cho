const Telegraf = require('telegraf')
const msg = require('./messages')

const bot = require('./service/bot-engine')

const app = new Telegraf('375464631:AAFxcfWfIamyDI9zlOI1ZHqsYNkVeUsCxrM')

app.command('start', (ctx) => {
    console.log('start', ctx.from)
    ctx.reply('Welcome!')
})

app.hears('hi', (ctx) => ctx.reply('Hey there!'))

app.on('sticker', (ctx) => ctx.reply('👍'))

app.startPolling()