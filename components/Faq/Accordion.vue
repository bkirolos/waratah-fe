<template>
  <div class="faq-accordion" :aria-expanded="expanded">
    <button class="faq-accordion-toggle" @click="toggleExpanded">
      <h3>{{ question }}</h3>
      <span aria-hidden="true" class="icon-container"></span>
    </button>
    <transition name="slide">
      <PortableText
        v-if="expanded"
        :blocks="answer"
        class="faq-accordion-content"
      />
    </transition>
  </div>
</template>

<script>
export default {
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
$vfast: 200ms;
$fast: 250ms;
$avg: 300ms;
$slow: 350ms;
$vslow: 400ms;

.faq-accordion {
  border-bottom: 1px solid theme('colors.white');
  transition: all 500ms ease;

  &[aria-expanded] {
    .faq-accordion-toggle {
      .icon-container::before {
        opacity: 0.1;
        transform: rotate(0deg);
      }
    }
  }

  .faq-accordion-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin: 28px 0px;
    text-align: left;
    width: 100%;

    .icon-container {
      display: flex;
      align-items: center;
      width: 12px;
      height: 36px;

      &::before,
      &::after {
        content: '';
        position: absolute;
        background: theme('colors.white');
        width: 12px;
        height: 2px;
      }

      &::before {
        opacity: 1;
        transform: rotate(-90deg);
        transition: transform 150ms cubic-bezier(1, 0.47, 0.72, 0.85) 100ms,
          opacity $vfast ease-out;
      }
    }
  }

  .faq-accordion-content {
    margin: 28px 16px 28px 0;
    p {
      color: theme('colors.gray-stroke')
    }
  }
}


.slide-enter-active,
.slide-leave-active {
  max-height: 100vh;
  opacity: 1;
  overflow: hidden;
  transition: max-height $avg ease-in;
}

.slide-enter,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  transition: max-height $vfast ease-out, opacity $avg;
}
</style>