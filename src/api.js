
export default {
  prices () {
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
          unit_price: 0.02,
          unit: 'core',
          t: 'hour',
          currency: 'euro'
        },
        storage: {
          unit_price: 0.02,
          unit: 'GB',
          t: 'hour',
          currency: 'euro'
        }
      }
    }]
  }
}
