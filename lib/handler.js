const { readFile } = require('fs').promises
const qs = require('querystring')
const md = require('markdown-it')()
const { json, send, text } = require('micro')
const { ADMINISTRATOR_MOBILE } = require('../config')
const saveNomination = require('./save-nomination')
const retrieveNomination = require('./retrieve-nomination')
const updateNomination = require('./update-nomination')
const checkUniqueNomination = require('./check-unique-nomination')
const sendMessage = require('./send-message')
const createAdministratorMessage = require('./create-administrator-message')
const createNomineeMessage = require('./create-nominee-message')
const fixMobileNumber = require('./fix-mobile-number')
const validateDate = require('./validate-data')
const logger = require('./logger')

exports.getFrontpage = async (request, response) => {
  logger('info', ['handlers', 'frontpage'])
  const readme = await readFile('README.md', 'utf-8')
  send(response, 200, md.render(readme))
}

exports.nominate = async (request, response) => {
  let data = await json(request)
  const isValid = validateDate(data)
  if (isValid.error === null) {
    data.mobile = fixMobileNumber(data.mobile)
    data.nomineeMobile = fixMobileNumber(data.nomineeMobile)
    data.replies = []
    try {
      await sendMessage({ mobile: data.mobile, message: `Nominasjonen er mottatt. Tusen takk for forslaget.` })
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
  } else {
    logger('error', ['index', 'nominate', 'invalid data', isValid.error])
    send(response, 400, isValid.error)
  }
}

exports.confirm = async (request, response) => {
  const payload = await text(request)
  const data = qs.parse(payload)
  try {
    const msg = data.Body.toLocaleLowerCase().split(' ')
    const msgType = msg.includes('ja')
      ? 'ja' : msg.includes('tja')
        ? 'tja' : msg.includes('nei')
          ? 'nei' : 'unknown'
    let nomination = await retrieveNomination(data.From)
    if (msgType === 'ja' || msgType === 'tja') {
      if (nomination.replies.length === 0) {
        nomination.msgType = msgType
        await sendMessage({ mobile: ADMINISTRATOR_MOBILE, message: createAdministratorMessage(nomination) })
      }
    }
    if (msgType !== 'unknown') {
      await sendMessage({ mobile: data.From, message: `Svaret er mottatt. Takk for tiden din.` })
      nomination.reply = data.Body
      await updateNomination(nomination)
      logger('info', ['handler', 'confirm', 'nomination', nomination._id, 'updated'])
    } else {
      await sendMessage({ mobile: data.From, message: `Skjønte ikke svaret ditt. Vennligst svar "ja", "tja" eller "nei"` })
    }
    logger('info', ['index', 'confirm', 'success'])
    send(response, 204)
  } catch (error) {
    logger('error', ['index', 'confirm', error])
    send(response, 500, error)
  }
}
