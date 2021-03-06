const qs = require('querystring')
const { json, send, text } = require('micro')
const { readFileSync } = require('fs')
const md = require('markdown-it')()
const ADMINISTRATOR_MOBILE = process.env.ADMINISTRATOR_MOBILE
const saveNomination = require('./save-nomination')
const retrieveNomination = require('./retrieve-nomination')
const updateNomination = require('./update-nomination')
const checkUniqueNomination = require('./check-unique-nomination')
const sendMessage = require('./send-message')
const createAdministratorMessage = require('./create-administrator-message')
const createNomineeMessage = require('./create-nominee-message')
const fixMobileNumber = require('./fix-mobile-number')
const validateData = require('./validate-data')
const validateMessage = require('./validate-message')
const logger = require('./logger')

exports.getFrontpage = async (request, response) => {
  logger('info', ['handlers', 'frontpage'])
  const readme = readFileSync('README.md', 'utf-8')
  send(response, 200, md.render(readme))
}

exports.message = async (request, response) => {
  let data = await json(request)
  const isValidMessage = validateMessage(data)
  if (isValidMessage.error === null) {
    data.mobile = fixMobileNumber(data.mobile)
    try {
      await sendMessage({ mobile: data.mobile, message: data.message })
      logger('info', ['index', 'message', 'success'])
      send(response, 200, data)
    } catch (error) {
      logger('error', ['index', 'message', error])
      send(response, 500, error)
    }
  } else {
    logger('error', ['index', 'message', 'invalid data', isValidMessage.error])
    send(response, 400, isValidMessage.error)
  }
}

exports.nominate = async (request, response) => {
  let data = await json(request)
  const isValid = validateData(data)
  if (isValid.error === null) {
    data.mobile = fixMobileNumber(data.mobile)
    data.nomineeMobile = fixMobileNumber(data.nomineeMobile)
    if (data.replyToNumber) {
      data.replyToNumber = fixMobileNumber(data.replyToNumber)
    }
    data.replies = []
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
    if (msgType !== 'unknown') {
      if (nomination.replies.length === 0) {
        nomination.msgType = msgType
        const adminNumber = nomination.replyToNumber ? nomination.replyToNumber : ADMINISTRATOR_MOBILE
        await sendMessage({ mobile: adminNumber, message: createAdministratorMessage(nomination) })
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
