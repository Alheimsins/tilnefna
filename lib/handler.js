const { readFile } = require('fs').promises
const md = require('markdown-it')()
const { json, send } = require('micro')
const logger = require('./logger')

exports.getFrontpage = async (request, response) => {
  logger('info', ['handlers', 'frontpage'])
  const readme = await readFile('README.md', 'utf-8')
  send(response, 200, md.render(readme))
}

exports.nominate = async (request, response) => {
  const data = await json(request)
  try {
    logger('info', ['index', 'nominate', 'success'])
    send(response, 200, data)
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
