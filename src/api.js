

export default {
  prices() {
    // GET /v1/prices
    return [{
      nerdalize: {
        ram: {
          unit_price: 0.01,
          unit: 'GB',
          t: 'hour',
          currency: 'euro'
        },
        cpu: {
          unitPrice: 0.02
          unit: 'core',
          t: 'hour',
          currency: 'euro'
        },
        storage: {
          unitPrice: 0.02,
          unit: 'GB',
          t: 'hour',
          currency: 'euro'
        }
      }
    }]
  }
}