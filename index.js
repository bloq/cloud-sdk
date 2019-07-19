'use strict'

const connectHttp = require('./src/connect/http')
const connectSocket = require('./src/connect/socket')
const auth = require('./src/auth')

const sdk = {
  connect: {
    http: connectHttp,
    socket: connectSocket
  },
  auth
}

module.exports = sdk
