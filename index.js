'use strict'

const blockchain = require('./blockchain')
const auth = require('./auth')

const sdk = {
  blockchain,
  auth
}

module.exports = sdk
