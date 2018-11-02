const axios = require('axios')
const qs = require('querystring')
const { ACCOUNT_SID, ACCOUNT_MOBILE, TWILIO_AUTH_TOKEN } = require('../config')
const logger = require('./logger')

module.exports = async options => {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`
  const payload = {
    Body: options.message,
    From: ACCOUNT_MOBILE,
    To: options.mobile
  }
  const config = {
    auth: {
      username: ACCOUNT_SID,
      password: TWILIO_AUTH_TOKEN
    },
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }
  try {
    const { data } = await axios.post(url, qs.stringify(payload), config)
    logger('info', ['notify-administrator', data.sid, 'success'])
    return data
  } catch (error) {
    console.error(error)
    logger('error', ['notify-administrator', error])
    throw error
  }
}
