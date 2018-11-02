const { readFile } = require('fs').promises
const md = require('markdown-it')()
const { json, send } = require('micro')
const saveNomination = require('./save-nomination')
const checkUniqueNomination = require('./check-unique-nomination')
const notifyAdministrator = require('./notify-administrator')
const createAdministratorMessage = require('./create-administrator-message')
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
      await notifyAdministrator(createAdministratorMessage(data))
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
  const data = await json(request)
  try {
    logger('info', ['index', 'confirm', 'success'])
    send(response, 200, data)
  } catch (error) {
    logger('error', ['index', 'confirm', error])
    send(response, 500, error)
  }
}
