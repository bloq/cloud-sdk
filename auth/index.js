'use strict'

const axios = require('axios')
const config = require('../config')

function createAuthClient ({ refreshToken, url = config.urls.accounts }) {
  const client = {}
  const api = axios.create({ baseURL: url })

  client.accessToken = function () {
    return api.put('/auth/token', { refreshToken })
      .then(res => res.data)
  }

  return client
}

module.exports = createAuthClient
