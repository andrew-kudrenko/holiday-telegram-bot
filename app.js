const Telegraf = require('telegraf')

const getHolidayList = require('./utils/get-holiday-list')

require('dotenv').config()

const port = process.env.PORT || 5000
const bot = new Telegraf(process.env.TOKEN)

const monthOrder = [
  'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
  'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
]

bot.start(ctx => {
  const greetingMsg = 'Привет! Благодаря мне ты всегда будешь в курсе всех прздничных событий =)'
  ctx.reply(greetingMsg)
})

bot.command('/today', ctx => {
  const date = new Date()
  const month = date.getMonth()
  const day = date.getDate()

  getHolidayList(month + 1, day, ctx)
})


bot.command('/tomorrow', ctx => {
  const date = new Date()
  const month = date.getMonth()
  const day = date.getDate() + 1
  
  getHolidayList(month + 1, day, ctx)
})

bot.startPolling()

// bot.command(/\/date \d+ .+/, ctx => {
  //   const [, day, monthName] = match.split(' ')
  
//   const month = monthOrder.findIndex(m => m.trim().toLowerCase() == monthName.trim().toLowerCase())

//   getHolidayList(month + 1, +day, ctx)
// })

// bot.on('message', ctx => {
  //   const match = /\d .+/.match(ctx.message)
//   if (match) {
  //     const [day, monthName] = match.split(' ')
//     const month = monthOrder.findIndex(m => m.trim().toLowerCase() == monthName.trim().toLowerCase())
//     getHolidayList(month + 1, +day, ctx)
//   } else {
  //     ctx.reply('Неизвестная команда')
  //   }
  // })
  
  // bot.command(/\/date \d+ \d+/, ctx => {
    //   const chatId = msg.chat.id
    
    //   const [, day, month] = match[0].split(' ')
    
    //   getHolidayList(+day, +month, chatId)
    // })