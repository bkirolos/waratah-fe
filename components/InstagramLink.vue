<template>
  <NavLink
    url="https://www.instagram.com/ducksofafeather"
    round
    aria-label="Instagram"
  >
    <InstagramIcon aria-hidden="true" />
  </NavLink>
</template>

<script>
import InstagramIcon from '@/assets/svg/instagram-logo.svg?inline'

export default {
  components: {
    InstagramIcon
  }
}
</script>
