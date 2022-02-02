<template>
  <header class="header p-1 md:pl-7 md:pr-8 md:py-3 w-full z-10">
    <nav class="header-nav">
      <div class="flex">
        <NavLink aria-label="Home">
          <Logo aria-hidden="true" />
        </NavLink>
      </div>

      <div class="hidden lg:flex">
        <NavLink type="text" url="/#the-athletes">The Athletes</NavLink>
        <NavLink type="text" url="/#the-shoe">The Shoe</NavLink>
        <NavLink type="text" url="/#the-nft">The NFT</NavLink>
        <NavLink type="text" url="/#the-auction">The Auction</NavLink>
        <NavLink type="text" url="/faq">FAQ</NavLink>
      </div>

      <div class="hidden lg:flex lg:justify-end">
        <NavLink url="https://twitter.com" round aria-label="Twitter">
          <Twitter aria-hidden="true" />
        </NavLink>
        <NavLink url="https://discord.com" round aria-label="Discord">
          <Discord aria-hidden="true" />
        </NavLink>
        <ConnectWallet />
      </div>

      <button class="nav-item-transition p-2 lg:hidden">
        <span class="nav-item-round">=</span>
      </button>
    </nav>
  </header>
</template>

<script>
import Logo from '@/assets/svg/division-street-logo-monogram.svg?inline'
import Twitter from '@/assets/svg/twitter-logo.svg?inline'
import Discord from '@/assets/svg/discord-logo.svg?inline'

export default {
  components: {
    Logo,
    Twitter,
    Discord
  }
}
</script>

<style lang="scss">
.header {
  color: theme('colors.white');
  position: fixed;

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
