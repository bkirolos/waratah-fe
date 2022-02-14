<template>
  <header class="header p-1 md:pl-7 md:pr-8 md:py-3">
    <nav class="header-nav">
      <div class="flex">
        <NavLink aria-label="Home" @click.native="scrollToTop">
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
        <!-- <ConnectWallet /> -->
        <TheMobileMenu class="flex lg:hidden" />
      </div>
    </nav>
  </header>
</template>

<script>
import Logo from '@/assets/svg/ducks-of-a-feather-logo.svg?inline'
import nav from '@/mixins/nav'

export default {
  components: {
    Logo
  },
  mixins: [nav],
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style lang="scss">
.header {
  color: theme('colors.white');
  pointer-events: none; // allows click events to "pass through" header
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;

  &-nav {
    display: flex;
    justify-content: space-between;
    @media (min-width: theme('screens.xl')) {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
    }

    a,
    button {
      pointer-events: auto; // ensures nav items are still clickable
    }
  }
}
</style>
