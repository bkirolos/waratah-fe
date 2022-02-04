<template>
  <article :class="['faq-accordion', { 'pb-7': expanded }]">
    <button
      :id="`${ariaId}-toggle`"
      class="faq-accordion-toggle py-7"
      :aria-expanded="expanded"
      :aria-controls="`${ariaId}-content`"
      @click="toggleExpanded"
    >
      <h3>{{ question }}</h3>
      <Chevron aria-hidden="true" class="flex-shrink-0 ml-2 my-1" />
    </button>
    <transition name="accordion-slide">
      <PortableText
        v-show="expanded"
        :id="`${ariaId}-content`"
        :blocks="answer"
        class="faq-accordion-content"
        :aria-labelledby="`${ariaId}-toggle`"
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
    faq: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      expanded: false
    }
  },
  computed: {
    answer() {
      return this.faq?.answer
    },
    ariaId() {
      return this.faq?._id
    },
    question() {
      return this.faq?.question
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

.faq-accordion {
  border-bottom: 1px solid theme('colors.white');
  transition: padding $duration ease-in-out;

  .faq-accordion-toggle {
    display: flex;
    justify-content: space-between;
    text-align: left;
    width: 100%;
    &[aria-expanded] {
      svg {
        transform: rotate(0.5turn);
      }
    }

    h3 {
      @media (max-width: calc(theme('screens.md') - 1px)) {
        font-size: theme('fontSize.sm');
      }
    }

    svg {
      transition: transform $duration ease-in-out;
    }
  }

  .faq-accordion-content {
    color: theme('colors.gray-stroke');
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
