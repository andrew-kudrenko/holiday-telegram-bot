const extractHolidaysList = require('./extract-holidays-list')
const fs = require('fs')
const path = require('path')

module.exports = () => new Promise(async resolve => {  
  try {
    const holidays = await extractHolidaysList()
    const filePath = path.join(__dirname, '..', 'data', 'holidays-list.json')

    fs.writeFile(filePath, holidays, err => {
      if (err) throw new Error('Writing data file error')
      resolve()
    })

  } catch (e) {
    throw new Error('Uploading to Firebase error')
  }
})