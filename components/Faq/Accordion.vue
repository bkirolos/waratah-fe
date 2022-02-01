<template>
  <div class="faq-accordion" :aria-expanded="expanded">
    <button class="faq-accordion-toggle" @click="toggleExpanded">
      <span aria-hidden="true" class="icon-container"></span>
      <h3>{{ question }}</h3>
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
.faq-accordion {
  border-top: 1px solid gray;
  transition: background 500ms ease;

  &[aria-expanded] {
    background: lightgray;
    .faq-accordion-toggle {
      .icon-container::before {
        opacity: 0.1;
        transform: rotate(0deg);
      }
    }
  }

  .faq-accordion-toggle {
    display: flex;
    padding: 16px;
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
        background: black;
        width: 12px;
        height: 2px;
      }

      &::before {
        opacity: 1;
        transform: rotate(-90deg);
        transition: transform 150ms cubic-bezier(1, 0.47, 0.72, 0.85) 100ms,
          opacity 0.5 ease-out;
      }
    }

    h3 {
      margin-left: 16px * 0.75;
      // @include breakpoint('mobile') {
      //   margin-left: 16px;
      // }
    }
  }

  .faq-accordion-content {
    padding: 8px 16px 16px;
  }
}
</style>