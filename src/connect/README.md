# Connect cloud-sdk
Javascript SDK to interact with BloqCloud blockchains

## Install

```bash
$ npm install --save @bloq/cloud-sdk
```

```bash
$ yarn add @bloq/cloud-sdk
```

## Use

```javascript
const { connect } = require('@bloq/cloud-sdk')

const clientId = 'CLIENT_ID'
const clientSecret = 'CLIENT_SECRET'
const coin = 'btc'
const network = 'mainnet'

const client = connect.http({
  clientId,
  clientSecret,
  coin,
  network
})

client.block('00000000dfd5d65c9d8561b4b8f60a63018fe3933ecb131fb37f905f87da951a')
  .then(function (block) {
    // Use block
  })

```

## API

### client.block(hash)
This method fetches a block by block hash

#### Parameters
`hash`: The hash of the block to be fetched


### client.blockHash(height)
This method fetches a block by block height

#### Parameters
`height`: The height of the block hash to be fetched. A height of 0 is the genesis block


### client.rawBlock(hash)
This method fetches a raw block by block hash

#### Parameters
`height`: The hash of the block to be fetched


### client.blocks({ limit, date })
This method fetches block summaries by date

#### Parameters
`limit`: The number of blocks to be fetched

`date`: The date of the blocks. Example: 2017-05-25


### client.transaction(hash)
This method fetches a transaction by transaction hash

#### Parameters
`hash`: The hash of the transaction to be fetched


### client.address({ address, from, to, noTxList })
This method fetches the properties of an address by address

#### Parameters
`address`: The address to be fetched

`from`: Number to paginate transactions from addresses

`to`: Number to paginate transactions from addresses

`noTxList`: Boolean to determine if transactions associated to the address should be fetched


### client.addressBalance(address)
This method fetches an address balance in satoshis

#### Parameters
`address`: The address of the balance to be fetched


### client.addressTotalReceived(address)
This method fetches an address total received in satoshis

#### Parameters
`address`: The address of the total received balance to be fetched


### client.addressTotalSent(address)
This method fetches an address total sent in satoshis

#### Parameters
`address`: The address of the total sent balance to be fetched


### client.addressUnconfirmedBalance(address)
This method fetches an address unconfirmed balance in satoshis

#### Parameters
`address`: The address of the unconfirmed balance to be fetched


### client.addressUnspentOutputs([addresses])
This method fetches unspent outputs from multiple addresses

#### Parameters
`addresses`: The unspent outputs addresses


### client.blockTransactions({ block, pageNum })
This method fetches transactions by block

#### Parameters
`block`: The block hash associated to the transactions to be fetched

`pageNum`: Pagination attribute


### client.addressTransactions({ address, pageNum })
This method fetches transactions for an address

#### Parameters
`address`: The addrress associated to the transactions to be fetched

`pageNum`: Pagination attribute


### client.addressesTransactions({ addresses, from, to, noAsm, noScriptSig, noSpent })
This method fetches transactions for multiple addresses

#### Parameters
`addresses`: The addrresses associated to the transactions to be fetched

`from`: Pagination attribute

`to`: Pagination attribute

`noAsm`: Will omit script asm from results

`noScriptSig`: Will omit the scriptSig from all inputs

`noSpent`: Will omit spent information per output


### client.sendTransaction(rawtx)
This method broadcasts a signed transaction
#### Parameters
`rawtx`: Signed transaction as hex string


### client.status(query)
This method fetches the status of the bitcoin network
#### Parameters
`query`: A specific attribute from the status code. Possible values are: getInfo, getDifficulty, getBestBlockHash and getLastBlockHash

### client.estimateFee(nbBlocks)
This method retrieves fee estimates

#### Parameters
`nbBlocks`: The number of blocks to confirm a transaction
