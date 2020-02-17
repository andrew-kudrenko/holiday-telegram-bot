const cheerio = require('cheerio')
const axios = require('axios')

module.exports = async () => {
  const url = 'https://my-calend.ru/holidays/russia/2020'

  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    const holidays = []

    $('.holidays-month-items').each((month, monthTable) =>
      $(monthTable).find('tr').each((day, dayTableRow) => {
        const currentDayHolidays = []
        $(dayTableRow).find('td:nth-child(2) > div')
          .each((index, elem) => currentDayHolidays.push($(elem).text().trim()))

        holidays.push({ day: day + 1, month: month + 1, holidays: currentDayHolidays })
      }))

    return JSON.stringify(holidays)

  } catch (e) {
    throw new Error('Holidays list extracting error')
  }
}