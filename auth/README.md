# Auth cloud-sdk
Javascript SDK to interact with bloqcloud accounts

## Install

```bash
$ npm install --save bloqpriv/cloud-sdk
```

```bash
$ yarn add bloqpriv/cloud-sdk
```

## Use

```javascript
const { auth } = require('@bloq/cloud-sdk')

const clientId = 'CLIENT_ID'
const clientSecret = 'CLIENT_SECRET'

const client = auth({ clientId, clientSecret })

client.accessToken()
  .then(function (accessToken) {
    // Use access token
  })

```

## API

#### client.accessToken()

This methods returns a promise that resolves in a new created access token using the provided client id and secret. The access token is required to interact with cloud services. It usually travels in an Authorization header value.