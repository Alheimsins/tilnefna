const test = require('ava')
const validateData = require('../lib/validate-data')

test('it returns true for valid data', t => {
  const data = {
    name: 'Zrrrzzt',
    mobile: '12345678',
    nomineeName: 'Maccyber',
    nomineeMobile: '87654321'
  }
  const result = validateData(data)
  t.is(result.error, null, 'Valid data ok')
})

test('it returns false for invalid data', t => {
  const data = {
    name: 'Zrrrzzt',
    mobile: '12345678'
  }
  const result = validateData(data)
  t.is(result.error.message, 'child "nomineeName" fails because ["nomineeName" is required]', 'Invalid data ok')
})
