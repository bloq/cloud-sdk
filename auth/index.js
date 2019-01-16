'use strict'

const axios = require('axios')
const config = require('../config')

function createAuthClient ({ refreshToken, url = config.urls.accounts }) {
  const client = {}

  const api = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${refreshToken}` }
  })

  client.accessToken = function () {
    return api.get('/access-token')
      .then(res => res.data)
  }

  return client
}

module.exports = createAuthClient
