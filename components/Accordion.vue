<template>
  <article :class="['accordion', { 'pb-7': expanded }]">
    <component :is="headingTag">
      <button
        :id="toggleId"
        :aria-expanded="expanded"
        :aria-controls="contentId"
        class="accordion-toggle heading-faq flex justify-between py-7 text-left w-full"
        @click="toggleExpanded"
      >
        {{ heading }}
        <Chevron aria-hidden="true" class="flex-shrink-0 ml-6 my-1" />
      </button>
    </component>
    <transition name="accordion-slide">
      <PortableText
        v-show="expanded"
        :id="contentId"
        :blocks="content"
        :aria-labelledby="toggleId"
        class="accordion-content pr-8"
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
    uniqueId: {
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
    toggleId() {
      return `${this.uniqueId}-toggle`
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
  border-bottom: 1px solid theme('colors.white');
  transition: padding $duration ease-in-out;

  .accordion-toggle {
    @media (max-width: calc(theme('screens.md') - 1px)) {
      font-size: theme('fontSize.sm');
    }

    &[aria-expanded] svg {
      transform: rotate(0.5turn);
    }

    svg {
      transition: transform $duration ease-in-out;
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
