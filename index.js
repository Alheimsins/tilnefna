const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN || '7363738383'

// Utilities
const handler = require('./lib/handler')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// ROUTES
router.get('/', handler.getFrontpage)
router.post('/api/nominate', handler.nominate)
router.post(`/api/${WEBHOOK_TOKEN}/confirm`, handler.confirm)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
