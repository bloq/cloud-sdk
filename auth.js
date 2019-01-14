'use strict'

const axios = require('axios')
const config = require('./config')

function createAuthClient (refreshToken) {
  const client = {}

  const api = axios.create({
    baseURL: config.urls.accounts,
    headers: { Authorization: `Bearer ${refreshToken}` }
  })

  client.accessToken = function () {
    return api.get(`/access-token`)
  }

  return client
}

module.exports = createAuthClient
