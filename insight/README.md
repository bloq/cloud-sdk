# Insight cloud-sdk
Javascript SDK to interact with bloqcloud blockchains

## Install

```bash
$ npm install --save bloqpriv/cloud-sdk
```

```bash
$ yarn add bloqpriv/cloud-sdk
```

## Use

```javascript
const { insight } = require('@bloq/cloud-sdk')

const refreshToken = 'REFRESH_TOKEN'
const accessToken = 'ACCESS_TOKEN'
const coin = 'btc'
const network = 'livenet'

const client = insight({
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
