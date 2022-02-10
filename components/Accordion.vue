<template>
  <article :class="['accordion', { 'pb-7': expanded }]">
    <component :is="headingTag">
      <button
        :id="toggleId"
        :aria-expanded="expanded"
        :aria-controls="contentId"
        class="accordion-toggle flex justify-between font-sans font-bold text-xs md:text-sm py-7 text-left uppercase w-full"
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
        class="accordion-content text-xs md:text-sm pr-8"
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
  border-bottom: 1px solid currentColor;
  transition: padding $duration ease-in-out;

  .accordion-toggle {
    svg {
      transition: transform $duration ease-in-out;
    }
    &[aria-expanded] svg {
      transform: rotate(0.5turn);
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
