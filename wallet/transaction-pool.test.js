const TransactionPool = require('./transaction-pool')
const Transaction = require('./transaction')
const Wallet = require('.')

describe('TransactionPool', () => {
  let tp
  let wallet
  let transaction

  beforeEach(() => {
    tp = new TransactionPool()
    wallet = new Wallet()
    transaction = Transaction.newTransaction(wallet, 'r3c1p13nt', 30)
    tp.updateOrAddTransaction(transaction)
  })

  it('add a transaction to the pool', () => {
    expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction)
  })

  it('updates a transaction in the pool', () => {
    const oldTransaction = JSON.stringify(transaction)
    const newTransaction = transaction.update(wallet, 'foo-address', 40)
    tp.updateOrAddTransaction(newTransaction)
    expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id)))
      .not.toEqual(oldTransaction)
  })
})
