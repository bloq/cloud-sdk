'use strict'

const axios = require('axios')
const config = require('./config')

function createClient ({ token, coin = 'btc', network = 'livenet' }) {
  const client = {}
  const api = axios.create({
    baseURL: config.urls[`${coin}-${network}`],
    headers: { Authorization: `Bearer ${token}` }
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
    return api.get(`/blocks`, { params: { limit, date } })
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
    return api.get(`/txs`, { params: { block, pageNum } })
  }

  client.addressTransactions = function ({ address, pageNum }) {
    return api.get(`/txs`, { params: { address, pageNum } })
  }

  client.addressesTransactions = function ({
    addresses,
    from,
    to,
    noAsm,
    noScriptSig,
    noSpent
  }) {
    return api.post(`/addrs/txs`, {
      addrs: addresses,
      from,
      to,
      noAsm,
      noScriptSig,
      noSpent
    })
  }

  client.sendTransaction = function (rawtx) {
    return api.post(`/tx/send`, { rawtx })
  }

  client.sync = function () {
    return api.get(`/sync`)
  }

  client.peer = function () {
    return api.get(`/peer`)
  }

  client.status = function (query) {
    return api.get(`/status`, { params: { q: query } })
  }

  client.estimateFee = function (nbBlocks) {
    return api.get(`/estimatefee`, { params: { nbBlocks } })
  }

  return client
}

module.exports = createClient