<template>
  <div>
    <button
      aria-label="Open Menu"
      class="hover-transition p-2"
      @click="openMenu"
    >
      <span class="nav-item-round">
        <MenuIcon aria-hidden="true" />
      </span>
    </button>

    <transition name="menu-slide">
      <FocusTrap
        v-if="isActive"
        :active="isActive"
        :initial-focus="() => $refs.closeButton"
        @deactivate="closeMenu"
      >
        <aside class="mobile-menu p-1 md:pl-7 md:pr-8 md:py-3">
          <div class="flex justify-between">
            <NavLink aria-label="Home" @click.native="closeMenu">
              <Logo aria-hidden="true" />
            </NavLink>

            <button
              ref="closeButton"
              aria-label="Close Menu"
              class="hover-transition p-2"
              @click="closeMenu"
            >
              <span class="nav-item-round">
                <CloseIcon aria-hidden="true" />
              </span>
            </button>
          </div>

          <div class="mt-11">
            <NavLink
              v-for="(link, index) in headerLinks"
              :key="index"
              :url="link.url"
              large
              @click.native="closeMenu"
            >
              {{ link.label }}
            </NavLink>

            <div class="flex mt-10">
              <TwitterLink />
              <DiscordLink />
            </div>
          </div>
        </aside>
      </FocusTrap>
    </transition>
  </div>
</template>

<script>
import { FocusTrap } from 'focus-trap-vue'
import CloseIcon from '@/assets/svg/close.svg?inline'
import Logo from '@/assets/svg/division-street-logo-monogram.svg?inline'
import MenuIcon from '@/assets/svg/menu.svg?inline'
import nav from '@/mixins/nav'

export default {
  components: {
    CloseIcon,
    FocusTrap,
    Logo,
    MenuIcon
  },
  mixins: [nav],
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    closeMenu() {
      this.isActive = false
      document.body.classList.remove('mobile-no-scroll')
    },
    openMenu() {
      this.isActive = true
      document.body.classList.add('mobile-no-scroll')
    }
  }
}
</script>

<style lang="scss">
.mobile-menu {
  background: theme('colors.yellow');
  bottom: 0;
  color: theme('colors.black');
  left: 0;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 0;
}

.mobile-no-scroll {
  @media (max-width: calc(theme('screens.lg') - 1px)) {
    overflow: hidden !important;
  }
}

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: transform 350ms cubic-bezier(0.76, 0, 0.24, 1);
}

.menu-slide-enter,
.menu-slide-leave-to {
  transform: translateX(100vw);
}
</style>
