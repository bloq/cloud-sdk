# Auth cloud-sdk
Javascript SDK to interact with bloqcloud accounts

## Install

```bash
$ npm install --save bloqpriv/cloud-sdk/auth
```

```bash
$ yarn add bloqpriv/cloud-sdk/auth
```

## Use

```javascript
const createAuthClient = require('@bloq/cloud-sdk/auth')

const refreshToken = 'foo'
const client = createAuthClient(refreshToken)

client.accessToken()
  .then(function (accessToken) {
    // Use access token
  })

```

## API

#### client.accessToken()

This methods returns a promise that resolves in a new created access token using the provided refresh token. The access token is required to interact with cloud services. It usually travels in an Authorization header value.