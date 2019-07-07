'use strict'

const io = require('socket.io-client')
const pDefer = require('p-defer')
const config = require('../../config')
const { auth: createAuthClient } = require('../../')

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

  const client = {}
  const subscriptions = []
  const authClient = createAuthClient(auth)

  client.connect = function () {
    const deferred = pDefer()

    authClient.accessToken()
      .then(function (token) {
        client.socket = io(url, { query: { token } })

        client.socket.on('connect', deferred.resolve)
        client.socket.on('error', deferred.reject)
        client.socket.on('disconnect', function (reason) {
          if (reason !== 'io server disconnect') {
            // Note: The socket will automatically try to reconnect
            return
          }

          // Note: the disconnection was initiated by the server, we need to
          // reconnect manually
          authClient.accessToken()
            .then(function (token) {
              client.socket.io.opts.query = { token }
              client.socket.connect()
            })
            .catch(function (err) {
              throw err
            })
        })
      })
      .catch(deferred.reject)

    return deferred.promise
  }

  client.isConnected = function () {
    return client.socket && client.socket.connected
  }

  client.onTransaction = function (fn) {
    if (!client.isConnected()) {
      throw new Error(
        'Failed subscribing to transactions, socket is disconnected'
      )
    }

    if (!subscriptions.includes('inv')) {
      client.socket.emit('subscribe', 'inv')
      subscriptions.push('inv')
    }
    client.socket.on('tx', fn)
  }

  client.onBlock = function (fn) {
    if (!client.isConnected()) {
      throw new Error(
        'Failed subscribing to blocks, socket is disconnected'
      )
    }

    if (!subscriptions.includes('inv')) {
      client.socket.emit('subscribe', 'inv')
      subscriptions.push('inv')
    }
    client.socket.on('block', fn)
  }

  client.onAddressTransaction = function (address, fn) {
    if (!client.isConnected()) {
      throw new Error(
        'Failed subscribing to address transactions, socket is disconnected'
      )
    }

    if (!subscriptions.includes(address)) {
      client.socket.emit('subscribe', 'bitcoind/addresstxid', address)
      subscriptions.push(address)
    }

    client.socket.on(address, fn)
  }

  return client
}

module.exports = createClient
