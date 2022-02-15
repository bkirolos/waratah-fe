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

export default {
  mixins: [beanAscii]
}
</script>
