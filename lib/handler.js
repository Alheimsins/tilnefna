const { readFile } = require('fs').promises
const qs = require('querystring')
const md = require('markdown-it')()
const { json, send, text } = require('micro')
const { ADMINISTRATOR_MOBILE } = require('../config')
const saveNomination = require('./save-nomination')
const retrieveNomination = require('./retrieve-nomination')
const checkUniqueNomination = require('./check-unique-nomination')
const sendMessage = require('./send-message')
const createAdministratorMessage = require('./create-administrator-message')
const createNomineeMessage = require('./create-nominee-message')
const logger = require('./logger')

exports.getFrontpage = async (request, response) => {
  logger('info', ['handlers', 'frontpage'])
  const readme = await readFile('README.md', 'utf-8')
  send(response, 200, md.render(readme))
}

exports.nominate = async (request, response) => {
  const data = await json(request)
  try {
    const isUniqueNomination = await checkUniqueNomination(data)
    if (isUniqueNomination) {
      const nomination = await saveNomination(data)
      await sendMessage({ mobile: data.nomineeMobile, message: createNomineeMessage(data) })
      logger('info', ['index', 'nominate', 'success'])
      send(response, 200, nomination)
    } else {
      logger('info', ['index', 'nominate', 'not unique'])
      send(response, 200, 'Thank you for the nomination')
    }
  } catch (error) {
    logger('error', ['index', 'nominate', error])
    send(response, 500, error)
  }
}

exports.confirm = async (request, response) => {
  const payload = await text(request)
  const data = qs.parse(payload)
  try {
    logger('info', ['index', 'confirm', 'success'])
    const msg = data.Body.toLocaleLowerCase().split(' ')
    await sendMessage({ mobile: data.From, message: `Meldingen er mottatt. Takk for tiden din.` })
    if (msg.includes('ja') || msg.includes('tja')) {
      const nomination = await retrieveNomination(data.From)
      await sendMessage({ mobile: ADMINISTRATOR_MOBILE, message: createAdministratorMessage(nomination) })
    }
    send(response, 200, data)
  } catch (error) {
    logger('error', ['index', 'confirm', error])
    send(response, 500, error)
  }
}
