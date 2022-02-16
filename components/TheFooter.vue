<template>
  <footer class="footer px-1 py-4 lg:pl-7 lg:pr-8 w-full">
    <div class="footer-logo flex">
      <NavLink url="https://www.divisionst.com" aria-label="Home">
        <Logo aria-hidden="true" />
      </NavLink>
    </div>

    <div
      class="footer-navigation lg:flex lg:justify-end xl:justify-center mt-8 lg:mt-0"
    >
      <NavLink
        v-for="(link, index) in footerLinks"
        :key="index"
        :url="link.url"
      >
        {{ link.label }}
      </NavLink>
    </div>

    <div class="footer-socials flex lg:justify-end items-center mt-9 lg:mt-0">
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
      <span class="divider"></span>
      <InstagramLink />
      <TwitterLink />
      <DiscordLink />
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
  @media (min-width: theme('screens.xl')) {
    grid-template-columns: auto auto auto;
    grid-template-areas: 'logo navigation socials';
  }

  .footer-logo {
    grid-area: logo;
  }

  .footer-navigation {
    grid-area: navigation;
  }

  .footer-socials {
    grid-area: socials;
    @media (max-width: calc(theme('screens.lg') - 1px)) {
      padding-left: theme('padding.3');
    }
  }

  .nav-item {
    font-size: 1rem;
  }

  .divider {
    border-left: 1px solid currentColor;
    height: 44px;
    margin: 0 1.5rem;
  }
}
</style>
