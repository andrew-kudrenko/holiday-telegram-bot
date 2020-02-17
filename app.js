const http = require('http')
const Telegraf = require('telegraf')

const getHolidayList = require('./utils/get-holiday-list')

require('dotenv').config()

const port = process.env.PORT || 5000
const bot = new Telegraf(process.env.TOKEN)

const monthOrder = [
  'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
  'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
]

bot.catch((err, ctx) => {
  console.log(`Error: ${err}`)
  ctx.reply('Error...')
})

bot.start(ctx => {
  const greetingMsg = 'Привет! Благодаря мне ты всегда будешь в курсе всех прздничных событий =)'
  ctx.reply(greetingMsg)
})

bot.command('today', ctx => {
  const date = new Date()
  const month = date.getMonth()
  const day = date.getDate()

  getHolidayList(+month + 1, day, ctx)
})


bot.command('tomorrow', ctx => {
  const date = new Date()
  const month = date.getMonth()
  const day = date.getDate() + 1

  getHolidayList(+month + 1, day, ctx)
})

bot.hears(/\/date \d+ \D+/, ctx => {
  const [, day, monthName] = ctx.match[0].split(' ')
  const month = monthOrder.findIndex(m => m.trim().toLowerCase() == monthName.trim().toLowerCase())

  getHolidayList(+month + 1, +day, ctx)
})

bot.hears(/\d \D+/, ctx => {
  const [day, monthName] = ctx.match[0].split(' ')
  const month = monthOrder.findIndex(m => m.trim().toLowerCase() == monthName.trim().toLowerCase())
  getHolidayList(+month + 1, +day, ctx)
})

bot.hears(/\/date \d+/, ctx => {
  const [day, month] = ctx.match

  getHolidayList(+day, +month, ctx)
})

bot.hears(/\d+/, ctx => {
  const [day, month] = ctx.match

  getHolidayList(+day, +month, ctx)
})

bot.startPolling()
bot.launch()

http.createServer().listen(port)