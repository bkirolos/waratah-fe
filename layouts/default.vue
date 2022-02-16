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
    this.checkConnection()
  }
}
</script>
