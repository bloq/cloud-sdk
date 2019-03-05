'use strict'

const insightHttp = require('./src/insight/http')
const insightSocket = require('./src/insight/socket')
const auth = require('./src/auth')

const sdk = {
  insight: {
    http: insightHttp,
    socket: insightSocket
  },
  auth
}

module.exports = sdk
