<template>
  <header class="header p-1 md:pl-7 md:pr-8 md:py-3">
    <nav class="header-nav">
      <div class="flex">
        <NavLink aria-label="Home">
          <Logo aria-hidden="true" />
        </NavLink>
      </div>

      <div class="hidden lg:flex">
        <NavLink
          v-for="(link, index) in headerLinks"
          :key="index"
          :url="link.url"
        >
          {{ link.label }}
        </NavLink>
      </div>

      <div class="flex justify-end">
        <TwitterLink class="hidden lg:flex" />
        <DiscordLink class="hidden lg:flex" />
        <ConnectWallet />
        <TheMobileMenu class="flex lg:hidden" />
      </div>
    </nav>
  </header>
</template>

<script>
import Logo from '@/assets/svg/division-street-logo-monogram.svg?inline'
import nav from '@/mixins/nav'

export default {
  components: {
    Logo
  },
  mixins: [nav]
}
</script>

<style lang="scss">
.header {
  color: theme('colors.white');
  position: fixed;
  width: 100%;
  z-index: 1;

  &-nav {
    display: flex;
    justify-content: space-between;
    @media (min-width: theme('screens.xl')) {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
    }
  }
}
</style>
