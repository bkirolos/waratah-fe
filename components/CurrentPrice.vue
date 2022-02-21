<template>
  <div>
    <h2 class="body font-bold mb-4">{{ currentPriceLabel }}</h2>
    <p class="flex items-center space-x-4">
      <span class="heading-3 leading-none">{{ priceETH }} ETH</span>
      <span v-if="priceUSD" class="body font-bold -mt-3">({{ priceUSD }})</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usd: null
    }
  },
  async fetch() {
    try {
      const { data } = await this.$axios.$get(
        'https://api.coinbase.com/v2/exchange-rates?currency=ETH'
      )
      this.usd = data.rates.USD
    } catch (e) {
      // console.log(e)
    }
  },
  computed: {
    auctionLive() {
      return !this.$web3?.auctionNotStarted()
    },
    priceETH() {
      return '1.760'
    },
    priceUSD() {
      return this.priceETH !== '-' && this.usd && this.$web3?.price
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(this.usd * parseFloat(this.priceETH))
        : null
    },
    currentPriceLabel() {
      return 'Final Price'
    }
  }
}
</script>
