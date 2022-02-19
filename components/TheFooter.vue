<template>
  <footer class="footer px-1 py-4 lg:pl-7 lg:pr-8 w-full">
    <div class="footer-logo flex">
      <NavLink url="https://www.divisionst.com" aria-label="Home">
        <Logo aria-hidden="true" />
      </NavLink>
    </div>

    <div class="footer-navigation lg:flex lg:justify-end mt-8 lg:mt-0">
      <NavLink
        v-for="(link, index) in footerLinks"
        :key="index"
        :url="link.url"
        :class="link.class"
      >
        {{ link.label }}
      </NavLink>
    </div>

    <div
      class="footer-socials grid gap-y-3 md:flex lg:justify-end items-center mt-9 lg:mt-0"
    >
      <div class="flex pl-3">
        <Hyperlink
          url="http://six21.xyz"
          aria-label="Built by Six21"
          class="hover-transition"
        >
          <Six21Icon aria-hidden="true" />
        </Hyperlink>
        <Hyperlink
          url="https://aerial.is/nft"
          aria-label="Aerial"
          class="ml-6 hover-transition"
        >
          <img src="~/assets/png/aerial-logo.png" aria-hidden="true" />
        </Hyperlink>
        <GenuineCollegeProductIcon class="ml-5" />
      </div>
      <span class="divider hidden md:block"></span>
      <div class="flex">
        <DiscordLink />
        <OpenSeaLink />
        <TwitterLink />
        <InstagramLink />
      </div>
    </div>
  </footer>
</template>

<script>
import GenuineCollegeProductIcon from '@/assets/svg/genuine-college-product-icon.svg?inline'
import Logo from '@/assets/svg/division-street-logo.svg?inline'
import Six21Icon from '@/assets/svg/six21-logo.svg?inline'
import nav from '@/mixins/nav'

export default {
  components: {
    GenuineCollegeProductIcon,
    Logo,
    Six21Icon
  },
  mixins: [nav]
}
</script>

<style lang="scss">
.footer {
  background: #0a0534;
  color: theme('colors.white');
  display: grid;
  grid-template-columns: auto;
  grid-template-areas:
    'logo'
    'navigation'
    'socials';
  @media (min-width: theme('screens.lg')) {
    grid-template-columns: auto auto;
    grid-template-areas:
      'logo navigation'
      'socials socials';
  }

  .footer-logo {
    grid-area: logo;
  }

  .footer-navigation {
    grid-area: navigation;
  }

  .footer-socials {
    grid-area: socials;
  }

  .nav-item {
    font-size: 1rem;
  }

  .divider {
    border-left: 1px solid currentColor;
    height: 44px;
    margin-left: 1.5rem;
    margin-right: 1rem;
  }
}
</style>
