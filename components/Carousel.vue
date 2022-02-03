<template>
  <div class="carousel-container">
    <div class="grid grid-cols-12 px-4 md:px-10">
      <div ref="embla" class="carousel md:col-start-2 col-span-full">
        <div class="carousel-slides">
          <Slide v-for="(slide, index) in slides" :key="index" :slide="slide" />
        </div>

        <div role="tablist" class="carousel-pagination">
          <button
            v-for="(snap, index) in scrollSnaps"
            :key="index"
            role="tab"
            :aria-label="`Slide ${index + 1}`"
            :aria-selected="index === selectedScrollSnap"
            class="carousel-pagination-dot"
            @click="scrollTo(index)"
          ></button>
        </div>
      </div>
    </div>

    <button
      :disabled="!canScrollPrevious"
      aria-label="Previous"
      class="carousel-navigation-arrow previous"
      @click="scrollPrevious"
    ></button>

    <button
      :disabled="!canScrollNext"
      aria-label="Next"
      class="carousel-navigation-arrow next"
      @click="scrollNext"
    ></button>
  </div>
</template>

<script>
import EmblaCarousel from 'embla-carousel'

export default {
  name: 'Carousel',
  props: {
    align: {
      type: String,
      default: 'center'
    },
    containScroll: {
      type: String,
      default: 'trimSnaps'
    },
    slides: {
      type: Array,
      default: () => []
    },
    slidesToScroll: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      canScrollPrevious: false,
      canScrollNext: false,
      embla: null,
      selectedScrollSnap: null,
      scrollSnaps: []
    }
  },
  computed: {
    options() {
      return {
        align: this.align,
        containScroll: this.containScroll,
        slidesToScroll: this.slidesToScroll
      }
    }
  },
  mounted() {
    this.initEmbla()
  },
  methods: {
    initEmbla() {
      this.embla = EmblaCarousel(this.$refs.embla, this.options)
      this.embla.on('resize', this.handleResize)
      this.embla.on('select', this.handleSelect)
      this.setScrollSnaps()
      this.setSelectedScrollSnap()
      this.setCanScroll()
    },
    handleResize() {
      this.setScrollSnaps()
      this.setSelectedScrollSnap()
      this.setCanScroll()
    },
    handleSelect() {
      this.setSelectedScrollSnap()
      this.setCanScroll()
    },
    scrollNext() {
      this.embla.scrollNext()
    },
    scrollPrevious() {
      this.embla.scrollPrev()
    },
    scrollTo(index) {
      this.embla.scrollTo(index)
    },
    setCanScroll() {
      this.canScrollNext = this.embla.canScrollNext()
      this.canScrollPrevious = this.embla.canScrollPrev()
    },
    setScrollSnaps() {
      this.scrollSnaps = this.embla.scrollSnapList()
    },
    setSelectedScrollSnap() {
      this.selectedScrollSnap = this.embla.selectedScrollSnap()
      this.$emit('select', this.selectedScrollSnap)
    }
  }
}
</script>

<style lang="scss">
$pagination-dot-padding: 3px;
$pagination-dot-size: 14px;
$pagination-row-height: $pagination-dot-size + ($pagination-dot-padding * 2);
$pagination-row-margin: 1rem;

.carousel-container {
  overflow: hidden;
  position: relative;
}

.carousel {
  position: relative;
}

.carousel-slides {
  display: flex;
  will-change: transform;
}

.carousel-pagination {
  display: flex;
  justify-content: center;
  margin-top: $pagination-row-margin;
}

.carousel-pagination-dot {
  color: theme('colors.gray-dark');
  height: $pagination-row-height;
  padding: $pagination-dot-padding;
  position: relative;
  width: $pagination-row-height;
  &:after {
    background: transparent;
    border: 1px solid currentColor;
    border-radius: 50%;
    content: '';
    height: $pagination-dot-size;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: $pagination-dot-size;
  }
  &[aria-selected] {
    &:after {
      background: currentColor;
    }
  }
}

.carousel-navigation-arrow {
  background-color: theme('colors.white');
  box-shadow: inset 0 0 0 1px theme('colors.gray-stroke');
  border-radius: 50%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  height: 24px;
  position: absolute;
  top: calc(50% - ($pagination-row-height + $pagination-row-margin) / 2);
  transform: translateY(-50%);
  width: 24px;
  @media (min-width: theme('screens.sm')) {
    height: 51px;
    width: 51px;
  }

  &:disabled {
    cursor: default;
  }

  &::after {
    background-image: url('~/assets/svg/arrow-thick.svg');
    background-repeat: no-repeat;
    background-position: center;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    @media (min-width: theme('screens.sm')) {
      background-image: url('~/assets/svg/arrow-thin.svg');
    }
  }

  &.previous {
    left: 0.5rem;
    @media (min-width: theme('screens.sm')) {
      left: 1.5rem;
    }

    &::after {
      transform: rotate(0.5turn);
    }
  }

  &.next {
    right: 0.5rem;
    @media (min-width: theme('screens.sm')) {
      right: 1.5rem;
    }
  }
}
</style>
