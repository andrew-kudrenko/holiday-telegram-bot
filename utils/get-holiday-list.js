const fs = require('fs')
const path = require('path')

const monthOrder = [
  'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
  'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
]

module.exports = (month, day, ctx) => {
  const dataFilePath = path.join(__dirname, '..', 'data', 'holidays-list.json')

  fs.readFile(dataFilePath, (err, data) => {
    if (err) throw new Error('Reading file error')

    const record = JSON.parse(data).find(r => r.month === month && r.day === day)
    if (record) {
      ctx.reply(`Праздники ${day} ${monthOrder[month - 1]}\n\n•${record.holidays.join('\n•')}`)
    } else {
      ctx.reply('Ошибка...')
    }
  })
}