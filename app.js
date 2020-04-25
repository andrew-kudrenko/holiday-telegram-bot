const express = require('express')
const Telegraf = require('telegraf')
const axios = require('axios')
const app = express()

const getHolidayList = require('./utils/get-holiday-list')

require('dotenv').config()

const bot = new Telegraf(process.env.TOKEN)

const port = process.env.PORT || 5000

const monthOrder = [
  'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
  'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
]

bot.catch((err, ctx) => {
  console.log(`Error: ${err}`)
  ctx.reply('Error...')
})

bot.start(ctx => {
  const commands = [
    '/today - Узнать, какой сегодня праздник',
    '/tomorrow - Узнать, какой праздник будет завтра',
    '/date [день] [название или порядковый номер месяца] - \nУзнать, какой праздник будет в нужный день',
    '[день] [название или порядковый номер месяца] - то же, что и предыдущая команда'
  ]
  const greetingMsg =
    `Привет! Благодаря мне ты всегда будешь в курсе всех прздничных событий =) Мой список команд:\n\n${commands.join('\n\n')}`
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

bot.hears(/\/date\s+\d+\s+\D+/, ctx => {
  const [, day, monthName] = ctx.match[0].split(' ')
  const month = monthOrder.findIndex(m => m.trim().toLowerCase() == monthName.trim().toLowerCase())

  getHolidayList(+month + 1, +day, ctx)
})

bot.hears(/\d+\s+\D+/, ctx => {
  const [day, monthName] = ctx.match[0].split(' ')
  const month = monthOrder.findIndex(m => m.trim().toLowerCase() == monthName.trim().toLowerCase())
  getHolidayList(+month + 1, +day, ctx)
})

bot.hears(/\/date\s+\d+/, ctx => {
  const [day, month] = ctx.match

  getHolidayList(+month, +day, ctx)
})

bot.hears(/\d+\s+\d+/, ctx => {
  const [day, month] = ctx.match[0].split(' ')

  getHolidayList(+month, +day, ctx)
})

bot.launch()

app.get('*', (_, res) => {
  res.send('Response')
})

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`)
  setInterval(() => {
    fetch('https://holiday-telegram-bot.herokuapp.com/')
      .then(console.log)
      .catch(console.log)
  }, 60e3 * 5)
})