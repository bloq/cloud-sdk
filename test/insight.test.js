'use strict'

const nock = require('nock')
const assert = require('assert')
const createInsightClient = require('../insight')
const config = require('../config')

const coin = 'btc'
const network = 'livenet'
const endpoint = config.urls[`${coin}-${network}`]
const blockHash = '00000000000ef57d9307f89f36e052afdfceaeb71deb8d36cfdd11dcef' +
                  'dc2490'
const transactionId = 'f64a111dba007fae77e0ad0488d9844b9e8b075fda321265a0e885' +
                      '56c98f1c94'
const address = 'mtbLoq1aCQ8VceaWKCmQsjwrEQkN4m8hbF'

describe('Insight Client', function () {
  const client = createInsightClient({
    token: 'token',
    coin: 'btc',
    network: 'livenet'
  })
  const response = { foo: 'baz' }

  it('should get a block', function () {
    const request = nock(endpoint)
      .get(`/block/${blockHash}`)
      .reply(200, response)

    return client.block(blockHash)
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get a block hash', function () {
    const blockHeight = 1
    const request = nock(endpoint)
      .get(`/block-index/${blockHeight}`)
      .reply(200, response)

    return client.blockHash(blockHeight)
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get a raw block', function () {
    const request = nock(endpoint)
      .get(`/rawblock/${blockHash}`)
      .reply(200, response)

    return client.rawBlock(blockHash)
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get blocks', function () {
    const query = {
      limit: 1,
      date: '2016-04-22'
    }
    const request = nock(endpoint)
      .get('/blocks')
      .query(query)
      .reply(200, response)

    return client.blocks(query)
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get a transaction', function () {
    const request = nock(endpoint)
      .get(`/tx/${transactionId}`)
      .reply(200, response)

    return client.transaction(transactionId)
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get a raw transaction', function () {
    const request = nock(endpoint)
      .get(`/rawtx/${transactionId}`)
      .reply(200, response)

    return client.rawTransaction(transactionId)
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get an address', function () {
    const request = nock(endpoint)
      .get(`/addr/${address}`)
      .query({
        from: 1,
        to: 2,
        noTxList: 1
      })
      .reply(200, response)

    return client.address({
      address,
      from: 1,
      to: 2,
      noTxList: 1
    })
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get an address balance', function () {
    const request = nock(endpoint)
      .get(`/addr/${address}/balance`)
      .query()
      .reply(200, response)

    return client.addressBalance(address)
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get an address total received balance', function () {
    const request = nock(endpoint)
      .get(`/addr/${address}/balance`)
      .query()
      .reply(200, response)

    return client.addressBalance(address)
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get an address total sent balance', function () {
    const request = nock(endpoint)
      .get(`/addr/${address}/totalSent`)
      .query()
      .reply(200, response)

    return client.addressTotalSent(address)
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get an address total sent balance', function () {
    const request = nock(endpoint)
      .get(`/addr/${address}/totalSent`)
      .query()
      .reply(200, response)

    return client.addressTotalSent(address)
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get an address unconfirmed balance', function () {
    const request = nock(endpoint)
      .get(`/addr/${address}/unconfirmedBalance`)
      .query()
      .reply(200, response)

    return client.addressUnconfirmedBalance(address)
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get addresses unspent outputs', function () {
    const request = nock(endpoint)
      .get(`/addrs/${address}/utxo`)
      .query()
      .reply(200, response)

    return client.addressUnspentOutputs(address)
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get block transactions', function () {
    const query = { block: blockHash, pageNum: 2 }
    const request = nock(endpoint)
      .get('/txs')
      .query(query)
      .reply(200, response)

    return client.blockTransactions(query)
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get address transactions', function () {
    const query = { address, pageNum: 2 }
    const request = nock(endpoint)
      .get('/txs')
      .query(query)
      .reply(200, response)

    return client.addressTransactions(query)
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get addresses transactions', function () {
    const request = nock(endpoint)
      .post('/addrs/txs', {
        addrs: [address],
        from: 2,
        to: 5,
        noAsm: true,
        noScriptSig: true,
        noSpent: true
      })
      .reply(200, response)

    return client.addressesTransactions({
      addresses: [address],
      from: 2,
      to: 5,
      noAsm: true,
      noScriptSig: true,
      noSpent: true
    })
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should send a transactions', function () {
    const rawTransaction = { foo: 'baz' }
    const request = nock(endpoint)
      .post('/tx/send', { rawtx: rawTransaction })
      .reply(200, response)

    return client.sendTransaction(rawTransaction)
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get sync data', function () {
    const request = nock(endpoint)
      .get('/sync')
      .reply(200, response)

    return client.sync()
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get peer data', function () {
    const request = nock(endpoint)
      .get('/peer')
      .reply(200, response)

    return client.peer()
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get status data', function () {
    const request = nock(endpoint)
      .get('/status')
      .reply(200, response)

    return client.status()
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })

  it('should get fee estimatation', function () {
    const request = nock(endpoint)
      .get('/estimatefee')
      .reply(200, response)

    return client.estimateFee()
      .then(function (res) {
        assert.deepStrictEqual(res.data, response)
        assert(request.isDone())
      })
  })
})