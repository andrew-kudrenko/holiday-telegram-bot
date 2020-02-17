const TelegramBot = require('node-telegram-bot-api')
const getHolidayList = require('./utils/get-holiday-list')
require('dotenv').config()

const http = require('http')

const port = process.env.PORT || 3000
const token = process.env.TOKEN
const bot = new TelegramBot(token, { polling: true })

const monthOrder = [
  'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
  'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
]

bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id
  const greetingMsg = 'Привет! Благодаря мне ты всегда будешь в курсе всех прздничных событий =)'

  bot.sendMessage(chatId, greetingMsg)
})

bot.onText(/\/today/, (msg, match) => {
  const chatId = msg.chat.id

  const date = new Date()
  const month = date.getMonth()
  const day = date.getDate()

  getHolidayList(month + 1, day, chatId)
})

bot.onText(/\/tomorrow/, msg => {
  const chatId = msg.chat.id

  const date = new Date()
  const month = date.getMonth()
  const day = date.getDate() + 1

  getHolidayList(month + 1, day, chatId)
})

bot.onText(/\/date \d+ .+/, (msg, match) => {
  const chatId = msg.chat.id
  const [, day, monthName] = match[0].split(' ')

  const month = monthOrder.findIndex(m => m.trim().toLowerCase() == monthName.trim().toLowerCase())

  getHolidayList(month + 1, Number.parseInt(day), chatId)
})

bot.on('message', msg => {
  const chatId = msg.chat.id
  const match = /\d .+/.match(msg)
  if (match) {
    const [day, monthName] = match.split(' ')
    const month = monthOrder.findIndex(m => m.trim().toLowerCase() == monthName.trim().toLowerCase())
    getHolidayList(month + 1, Number.parseInt(day), chatId)
  } else {
    bot.sendMessage('Неизвестная команда')
  }
})

bot.onText(/\/date \d+ \d+/, (msg, match) => {
  const chatId = msg.chat.id

  const [, day, month] = match[0].split(' ')

  getHolidayList(day, month, chatId)
})

http.createServer().listen(port)