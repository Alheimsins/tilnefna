const mongojs = require('mongojs')
const { DB_CONNECTION_STRING } = require('../config')
const logger = require('./logger')
const db = mongojs(DB_CONNECTION_STRING)
const nominations = db.collection('nominations')

module.exports = mobile => {
  return new Promise((resolve, reject) => {
    nominations.find({ nomineeMobile: mobile }, (error, documents) => {
      if (error) {
        logger('error', ['retrieve-nomination', error])
        return reject(error)
      } else {
        logger('error', ['retrieve-nomination', 'got', documents.length, 'hits', 'success'])
        return resolve(documents[0])
      }
    })
  })
}
