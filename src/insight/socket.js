'use strict'

const io = require('socket.io-client')
const config = require('../../config')
const { auth: createAuthClient } = require('../../')

const JWT_EXPIRED_ERROR = 'jwt expired'

function createClient ({
  coin = 'btc',
  network = 'mainnet',
  url = config.urls.insight[`${coin}-${network}`],
  auth = {}
}) {
  if (!auth.clientId || !auth.clientSecret) {
    throw new Error(
      'Failed creating BloqCloud insight client. client id and client ' +
      'secret are required'
    )
  }

  const authClient = createAuthClient(auth)
  const socket = io(url, {
    query: {
      token: auth.accessToken
    }
  })

  socket.on('reconnect_attempt', function () {
    authClient.accessToken(function (token) {
      socket.io.opts.query = { token }
    })
  })

  socket.on('disconnect', function (reason) {
    if (reason !== JWT_EXPIRED_ERROR) {
      return
    }
    authClient.accessToken(function (token) {
      socket.io.opts.query = { token }
      socket.connect()
    })
  })

  return socket
}

module.exports = createClient
