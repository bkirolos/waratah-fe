<template>
  <article :id="uniqueId" :class="['accordion', { 'pb-7': expanded, 'no-link-padding': hidePadding } ]">
    <component :is="headingTag">
      <button
        :id="toggleId"
        :aria-expanded="expanded"
        :aria-controls="contentId"
        class="accordion-toggle flex justify-between font-sans text-xs font-bold leading-none py-7 text-left uppercase w-full"
        @click="toggleExpanded"
      >
        {{ heading }}
        <Chevron aria-hidden="true" class="flex-shrink-0 ml- my-1" />
      </button>
    </component>
    <transition name="accordion-slide">
      <PortableText
        v-show="expanded"
        :id="contentId"
        :blocks="content"
        :aria-labelledby="toggleId"
        class="accordion-content text-xs pr-8"
      />
    </transition>
  </article>
</template>

<script>
import Chevron from '@/assets/svg/chevron.svg?inline'

export default {
  components: {
    Chevron
  },
  props: {
    content: {
      type: Array,
      default: null
    },
    heading: {
      type: String,
      default: ''
    },
    headingTag: {
      type: String,
      default: 'h3'
    },
    slug: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      expanded: false
    }
  },
  computed: {
    contentId() {
      return `${this.uniqueId}-content`
    },
    isHash() {
      return this.$route.hash === `#${this.slugUrl}`
    },
    hidePadding() {
      return this.isHash && this.expanded
    },
    toggleId() {
      return `${this.uniqueId}-toggle`
    },
    slugUrl() {
      return this.slug?.current
    },
    uniqueId() {
      if (this.slugUrl) {
        return this.slugUrl
      }
      return this.id
    }
  },
  mounted() {
    if (this.isHash){
      this.expanded = true
    }
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style lang="scss">
$duration: 300ms;

.accordion {
  border-bottom: 1px solid currentColor;
  transition: padding $duration ease-in-out;
  &::before {
    display: block; 
    content: " "; 
    margin-top: -80px; 
    height: 80px; 
    visibility: hidden; 
    pointer-events: none;
  }
  &.no-link-padding {
    &::before {
      display: none;
    }
  }
  .accordion-toggle {
    svg {
      transition: transform $duration ease-in-out;
    }
    &[aria-expanded] svg {
      transform: rotate(0.5turn);
    }
  }

  .accordion-toggle,
  .accordion-content {
    @media (min-width: theme('screens.md')) {
      font-size: 1rem;
    }
  }
}

.accordion-slide-enter-active,
.accordion-slide-leave-active {
  max-height: 100vh;
  overflow: hidden;
  transition: max-height $duration ease-in;
}

.accordion-slide-enter,
.accordion-slide-leave-to {
  max-height: 0;
  transition: max-height $duration ease-out;
}
</style>
