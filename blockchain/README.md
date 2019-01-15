# Blockchain cloud-sdk
Javascript SDK to interact with bloqcloud blockchains

## Install

```bash
$ npm install --save bloqpriv/cloud-sdk
```

```bash
$ yarn add bloqpriv/cloud-sdk
```

## Import
There are two ways of importing the Blockchain sdk

```javascript
const blockchain = require('@bloq/cloud-sdk/blockchain')
```

```javascript
const { blockchain } = require('@bloq/cloud-sdk')
```


## Use

```javascript
const createBlockchainClient = require('@bloq/cloud-sdk/blockchain')

const refreshToken = 'REFRESH_TOKEN'
const accessToken = 'ACCESS_TOKEN'
const coin = 'btc'
const network = 'livenet'

const client = createBlockchainClient({
  refreshToken,
  accessToken,
  coin,
  network
})

client.block('00000000dfd5d65c9d8561b4b8f60a63018fe3933ecb131fb37f905f87da951a')
  .then(function (block) {
    // Use block
  })

```

## API

#### client.block(block)
#### client.blockHash(height)
#### client.rawBlock(hash)
#### client.blocks({ limit, date })
#### client.transaction(txid)
#### client.address({ address, from, to, noTxList })
#### client.addressBalance(address)
#### client.addressTotalReceived(address)
#### client.addressTotalSent(address)
#### client.addressUnconfirmedBalance(address)
#### client.addressUnspentOutputs([address])
#### client.blockTransactions({ block, pageNum })
#### client.addressTransactions({ address, pageNum })
#### client.addressesTransactions({ addresses, from, to, noAsm, noScriptSig, noSpent })
#### client.sendTransaction(rawtx)
#### client.sync()
#### client.peer()
#### client.status(query)
#### client.estimateFee(nbBlocks)
