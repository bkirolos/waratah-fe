<template>
  <footer class="footer px-1 pt-1 pb-2 lg:pl-7 lg:pr-8 lg:py-1">
    <div class="flex">
      <NavLink aria-label="Home">
        <Logo aria-hidden="true" />
      </NavLink>
    </div>

    <div class="lg:flex mt-8 lg:mt-0">
      <NavLink url="/#the-athletes">The Athletes</NavLink>
      <NavLink url="/#the-shoe">The Shoe</NavLink>
      <NavLink url="/#the-nft">The NFT</NavLink>
      <NavLink url="/#faq">FAQ</NavLink>
      <NavLink url="/terms-and-conditions">Terms & Conditions</NavLink>
    </div>

    <div class="flex lg:justify-end mt-9 lg:mt-0">
      <TwitterLink />
      <DiscordLink />
    </div>
  </footer>
</template>

<script>
import Logo from '@/assets/svg/division-street-logo.svg?inline'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss">
.footer {
  background: theme('colors.yellow');
  color: theme('colors.black');
  width: 100%;
  @media (min-width: theme('screens.lg')) {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
  }
}
</style>
