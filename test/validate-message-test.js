const test = require('ava')
const validateData = require('../lib/validate-message')

test('it returns true for valid data', t => {
  const data = {
    mobile: '12345678',
    message: 'You rock!'
  }
  const result = validateData(data)
  t.is(result.error, null, 'Valid data ok')
})

test('it returns false for invalid data', t => {
  const data = {
    mobile: '12345678'
  }
  const result = validateData(data)
  t.is(result.error.message, 'child "message" fails because ["message" is required]', 'Invalid data ok')
})
