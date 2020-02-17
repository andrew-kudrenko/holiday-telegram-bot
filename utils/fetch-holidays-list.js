const fs = require('fs')
const path = require('path')

module.exports = () => new Promise(resolve => {
  const dataPath = path.join(__dirname, '..', 'data', 'holidays-list.json')

  fs.readFile(dataPath, (err, data) => {
    if (err) throw new Error('Reading data file error')
    resolve(data)
  })
})