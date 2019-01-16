'use strict'

const axios = require('axios')
const config = require('../config')
const createAuthClient = require('../auth')

function createClient ({
  accessToken,
  refreshToken,
  coin = 'btc',
  network = 'livenet',
  url = config.urls.blockchain[`${coin}-${network}`]
}) {
  if (!accessToken && !refreshToken) {
    throw new Error(
      'Failed creating bloqcloud blockchain client. accessToken or refreshToken ' +
      'is required'
    )
  }

  const useAuthClient = !!refreshToken
  const client = { accessToken }
  const authClient = useAuthClient
    ? createAuthClient(refreshToken)
    : {}

  const api = axios.create({
    baseURL: url,
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
      .then(res => res.data)
  }

  client.blockHash = function (height) {
    return api.get(`/block-index/${height}`)
      .then(res => res.data)
  }

  client.rawBlock = function (hash) {
    return api.get(`/rawblock/${hash}`)
      .then(res => res.data)
  }

  client.blocks = function ({ limit, blockDate } = {}) {
    return api.get('/blocks', { params: { limit, blockDate } })
      .then(res => res.data)
  }

  client.transaction = function (txid) {
    return api.get(`/tx/${txid}`)
      .then(res => res.data)
  }

  client.rawTransaction = function (txid) {
    return api.get(`/rawtx/${txid}`)
      .then(res => res.data)
  }

  client.address = function ({ address, from, to, noTxList } = {}) {
    return api.get(`/addr/${address}`, { params: { from, to, noTxList } })
      .then(res => res.data)
  }

  client.addressBalance = function (addr) {
    return api.get(`/addr/${addr}/balance`)
      .then(res => res.data)
  }

  client.addressTotalReceived = function (addr) {
    return api.get(`/addr/${addr}/totalReceived`)
      .then(res => res.data)
  }

  client.addressTotalSent = function (addr) {
    return api.get(`/addr/${addr}/totalSent`)
      .then(res => res.data)
  }

  client.addressUnconfirmedBalance = function (addr) {
    return api.get(`/addr/${addr}/unconfirmedBalance`)
      .then(res => res.data)
  }

  client.addressUnspentOutputs = function (addresses) {
    const addrs = Array.isArray(addresses) ? addresses : [addresses]

    return api.get(`/addrs/${addrs}/utxo`)
      .then(res => res.data)
  }

  client.blockTransactions = function ({ block, pageNum } = {}) {
    return api.get('/txs', { params: { block, pageNum } })
      .then(res => res.data)
  }

  client.addressTransactions = function ({ address, pageNum } = {}) {
    return api.get('/txs', { params: { address, pageNum } })
      .then(res => res.data)
  }

  client.addressesTransactions = function ({
    addresses,
    from,
    to,
    noAsm,
    noScriptSig,
    noSpent
  } = {}) {
    return api.post('/addrs/txs', {
      addrs: addresses,
      from,
      to,
      noAsm,
      noScriptSig,
      noSpent
    })
      .then(res => res.data)
  }

  client.sendTransaction = function (rawtx) {
    return api.post('/tx/send', { rawtx })
      .then(res => res.data)
  }

  client.sync = function () {
    return api.get('/sync')
      .then(res => res.data)
  }

  client.peer = function () {
    return api.get('/peer')
      .then(res => res.data)
  }

  client.status = function (query) {
    return api.get('/status', { params: { q: query } })
      .then(res => res.data)
  }

  client.estimateFee = function (nbBlocks) {
    return api.get('/utils/estimatefee', { params: { nbBlocks } })
      .then(res => res.data)
  }

  return client
}

module.exports = createClient
