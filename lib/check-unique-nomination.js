const mongojs = require('mongojs')
const { DB_CONNECTION_STRING } = require('../config')
const logger = require('./logger')
const db = mongojs(DB_CONNECTION_STRING)
const nominations = db.collection('nominations')

module.exports = nomination => {
  return new Promise((resolve, reject) => {
    nominations.find({ nomineeMobile: nomination.nomineeMobile }, (error, documents) => {
      if (error) {
        logger('error', ['check-unique-nomination', error])
        return reject(error)
      } else {
        logger('error', ['check-unique-nomination', 'got', documents.length, 'hits', 'success'])
        return resolve(documents.length === 0)
      }
    })
  })
}
