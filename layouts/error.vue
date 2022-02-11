<template>
  <section
    class="flex flex-col justify-center items-center px-4 md:px-10 py-14 text-center w-full"
  >
    <h1 class="heading-2 text-xl">
      {{ heading }}
    </h1>
    <h2 class="heading-5 text-base">
      {{ subheading }}
    </h2>
    <CTA
      :cta="cta"
      class="bg-lime border-lime text-black mt-6 px-12 normal-case"
    />
  </section>
</template>

<script>
export default {
  computed: {
    cta() {
      return {
        icon: 'none',
        link: '/',
        text: 'Back To Home'
      }
    },
    heading() {
      return '404'
    },
    subheading() {
      return "We can't find the page you are looking for"
    }
  }
}
</script>
