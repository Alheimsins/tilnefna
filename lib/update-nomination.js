const mongojs = require('mongojs')
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost/tilnefna'
const logger = require('./logger')
const db = mongojs(DB_CONNECTION_STRING)
const nominations = db.collection('nominations')

module.exports = nomination => {
  return new Promise((resolve, reject) => {
    const nominationId = mongojs.ObjectId(nomination._id)
    nominations.update({ '_id': nominationId }, { '$push': { replies: nomination.reply } }, (error, document) => {
      if (error) {
        logger('error', ['update-nominations', error])
        return reject(error)
      } else {
        logger('error', ['update-nominations', 'success'])
        return resolve(document)
      }
    })
  })
}
