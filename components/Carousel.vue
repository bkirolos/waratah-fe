<template>
  <div class="carousel-container">
    <div class="grid grid-cols-12 px-4 md:px-10">
      <div ref="embla" class="carousel md:col-start-2 col-span-full">
        <div class="carousel-slides">
          <Slide v-for="(slide, index) in slides" :key="index" :slide="slide" />
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

.carousel-navigation-arrow {
  background-color: theme('colors.white');
  box-shadow: inset 0 0 0 1px theme('colors.gray-stroke');
  border-radius: 50%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  height: 24px;
  position: absolute;
  top: 50%;
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
    content: '';
    inset: 0;
    position: absolute;
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
