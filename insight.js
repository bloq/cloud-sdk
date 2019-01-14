'use strict'

const axios = require('axios')
const config = require('./config')
const createAuthClient = require('./auth')

function createClient ({
  accessToken,
  refreshToken,
  coin = 'btc',
  network = 'livenet'
}) {
  if (!accessToken && !refreshToken) {
    throw new Error(
      'Failed creating bloqcloud insight client. accessToken or refreshToken ' +
      'is required'
    )
  }

  const useAuthClient = !!refreshToken
  const client = { accessToken }
  const authClient = useAuthClient
    ? createAuthClient(refreshToken)
    : {}

  const api = axios.create({
    baseURL: config.urls.insight[`${coin}-${network}`],
    headers: { Authorization: `Bearer ${client.accessToken}` }
  })

  api.interceptors.request.use(function (config) {
    if (!useAuthClient || accessToken) {
      return config
    }

    return authClient.accessToken()
      .then(function (accessToken) {
        client.accessToken = accessToken
        config.headers.Authorization = `Bearer ${accessToken}`
        return config
      })
  }, function (err) {
    return Promise.reject(err)
  })

  api.interceptors.response.use(function (response) {
    return response
  }, function (err) {
    if (!err.response) {
      return Promise.reject(err)
    }

    const { status, headers } = err.response
    if (status !== 401 || !headers['x-access-token-expired']) {
      return Promise.reject(err)
    }

    return authClient.accessToken()
      .then(function (accessToken) {
        client.accessToken = accessToken
        err.config.headers.Authorization = `Bearer ${accessToken}`
        return axios.request(err.config)
      })
  })

  client.block = function (hash) {
    return api.get(`/block/${hash}`)
  }

  client.blockHash = function (height) {
    return api.get(`/block-index/${height}`)
  }

  client.rawBlock = function (hash) {
    return api.get(`/rawblock/${hash}`)
  }

  client.blocks = function ({ limit, date }) {
    return api.get('/blocks', { params: { limit, date } })
  }

  client.transaction = function (txid) {
    return api.get(`/tx/${txid}`)
  }

  client.rawTransaction = function (txid) {
    return api.get(`/rawtx/${txid}`)
  }

  client.address = function ({ address, from, to, noTxList }) {
    return api.get(`/addr/${address}`, { params: { from, to, noTxList } })
  }

  client.addressBalance = function (addr) {
    return api.get(`/addr/${addr}/balance`)
  }

  client.addressTotalReceived = function (addr) {
    return api.get(`/addr/${addr}/totalReceived`)
  }

  client.addressTotalSent = function (addr) {
    return api.get(`/addr/${addr}/totalSent`)
  }

  client.addressUnconfirmedBalance = function (addr) {
    return api.get(`/addr/${addr}/unconfirmedBalance`)
  }

  client.addressUnspentOutputs = function (addresses) {
    const addrs = Array.isArray(addresses) ? addresses : [addresses]
    return api.get(`/addrs/${addrs}/utxo`)
  }

  client.blockTransactions = function ({ block, pageNum }) {
    return api.get('/txs', { params: { block, pageNum } })
  }

  client.addressTransactions = function ({ address, pageNum }) {
    return api.get('/txs', { params: { address, pageNum } })
  }

  client.addressesTransactions = function ({
    addresses,
    from,
    to,
    noAsm,
    noScriptSig,
    noSpent
  }) {
    return api.post('/addrs/txs', {
      addrs: addresses,
      from,
      to,
      noAsm,
      noScriptSig,
      noSpent
    })
  }

  client.sendTransaction = function (rawtx) {
    return api.post('/tx/send', { rawtx })
  }

  client.sync = function () {
    return api.get('/sync')
  }

  client.peer = function () {
    return api.get('/peer')
  }

  client.status = function (query) {
    return api.get('/status', { params: { q: query } })
  }

  client.estimateFee = function (nbBlocks) {
    return api.get('/estimatefee', { params: { nbBlocks } })
  }

  return client
}

module.exports = createClient
