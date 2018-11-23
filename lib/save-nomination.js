const mongojs = require('mongojs')
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost/tilnefna'
const logger = require('./logger')
const db = mongojs(DB_CONNECTION_STRING)
const nominations = db.collection('nominations')

module.exports = nomination => {
  return new Promise((resolve, reject) => {
    nominations.save(nomination, (error, document) => {
      if (error) {
        logger('error', ['save-nominations', error])
        return reject(error)
      } else {
        logger('error', ['save-nominations', 'success'])
        return resolve(document)
      }
    })
  })
}
