'use strict'

const nock = require('nock')
const assert = require('assert')
const config = require('../config')
const { auth } = require('../')

const grantType = 'clientCredentials'
const clientId = 'CLIENT_ID'
const clientSecret = 'CLIENT_SECRET'

describe('Auth Client', function () {
  const client = auth({ clientId, clientSecret, url: config.urls.accounts })

  it('should get an access token', function () {
    const request = nock(config.urls.accounts)
      .post('/auth/token', {
        clientId,
        clientSecret,
        grantType
      })
      .reply(200)

    return client.accessToken()
      .then(function () {
        assert(request.isDone())
      })
  })
})
