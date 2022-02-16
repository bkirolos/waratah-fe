<template>
  <div class="bg-navy text-white flex flex-col min-h-screen">
    <TheHeader />
    <main class="flex flex-1">
      <Nuxt />
    </main>
    <TheFooter />
    <PreviewModeBanner />
  </div>
</template>

<script>
import beanAscii from '@/mixins/beanAscii'
import web3 from '@/mixins/web3'

export default {
  mixins: [beanAscii, web3],
  mounted() {
    // if this person has already connected to waratah, check for existing connection
    // and try to connect if we can
    if (
      this.$web3Modal.cachedProvider &&
      this.$web3Modal.cachedProvider === 'injected'
    ) {
      this.checkConnection()
    }
  }
}
</script>
