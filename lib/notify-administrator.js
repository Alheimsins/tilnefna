const axios = require('axios')
const qs = require('querystring')
const { ACCOUNT_SID, ACCOUNT_MOBILE, AUTH_TOKEN, ADMINISTRATOR_MOBILE } = require('../config')
const logger = require('./logger')

module.exports = async message => {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`
  const payload = {
    Body: message,
    From: ACCOUNT_MOBILE,
    To: ADMINISTRATOR_MOBILE
  }
  const config = {
    auth: {
      username: ACCOUNT_SID,
      password: AUTH_TOKEN
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
