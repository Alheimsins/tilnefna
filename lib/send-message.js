const axios = require('axios')
const qs = require('querystring')
const ACCOUNT_SID = process.env.ACCOUNT_SID || '7363738383'
const ACCOUNT_MOBILE = process.env.ACCOUNT_MOBILE || '7363738383'
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '7363738383'
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
