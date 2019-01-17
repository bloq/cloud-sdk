'use strict'

const nock = require('nock')
const assert = require('assert')
const createAuthClient = require('../auth')
const config = require('../config')

const refreshToken = 'Foo'

describe('Auth Client', function () {
  const client = createAuthClient({ refreshToken })

  it('should get an access token', function () {
    const request = nock(config.urls.accounts)
      .put('/auth/token', { refreshToken })
      .reply(200)

    return client.accessToken()
      .then(function () {
        assert(request.isDone())
      })
  })
})
