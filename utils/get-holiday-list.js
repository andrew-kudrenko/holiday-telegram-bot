const fs = require('fs')
const path = require('path')

module.exports = (month, day, ctx) => {
  const dataFilePath = path.join(__dirname, '..', 'data', 'holidays-list.json')

  fs.readFile(dataFilePath, (err, data) => {
    if (err) throw new Error('Reading file error')

    const record = JSON.parse(data).find(r => r.month === month && r.day === day)
    ctx.reply(`Праздники ${day} ${monthOrder[month - 1]}\n\n${record.holidays.join('\n')}`)
  })
}