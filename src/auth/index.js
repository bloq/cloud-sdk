'use strict'

const axios = require('axios')
const config = require('../../config')

function createAuthClient ({
  clientId,
  clientSecret,
  url = config.urls.accounts
}) {
  if (!clientId || !clientSecret) {
    throw new Error(
      'Failed creating bloqcloud auth client. client id and client secret ' +
      'are required'
    )
  }

  const client = {}
  const api = axios.create({ baseURL: url })

  client.accessToken = function () {
    return api.post('/auth/token', {
      clientId,
      clientSecret,
      grantType: 'clientCredentials'
    })
      .then(res => res.data.accessToken)
  }

  return client
}

module.exports = createAuthClient
