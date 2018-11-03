const test = require('ava')
const fixMobileNumber = require('../lib/fix-mobile-number')

test('it adds +47 to number', t => {
  const num = '67 53 46 42'
  const expected = '+4767534642'
  t.deepEqual(fixMobileNumber(num), expected, '+47 added')
})
