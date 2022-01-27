<template>
  <div class="carousel-container">
    <div v-if="showPagination" role="tablist" class="carousel-pagination">
      <button
        v-for="(snap, index) in scrollSnaps"
        :key="index"
        role="tab"
        :aria-selected="index === selectedScrollSnap"
        class="carousel-pagination-dot"
        @click="scrollTo(index)"
      ></button>
    </div>

    <div ref="embla" class="carousel">
      <div class="carousel-slides">
        <slot></slot>
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
  </div>
</template>

<script>
import EmblaCarousel from 'embla-carousel'

export default {
  name: 'Carousel',
  props: {
    align: {
      type: String,
      default: 'start'
    },
    containScroll: {
      type: String,
      default: 'trimSnaps'
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
    },
    showPagination() {
      return this.scrollSnaps?.length > 1
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
  position: relative;
}

.carousel {
  position: relative;
}

.carousel-slides {
  display: flex;
  will-change: transform;
}

.carousel-slide {
  flex-shrink: 0;
  margin-right: 0.5rem;
  position: relative;
}

.carousel-pagination {
  display: flex;
  margin-bottom: 2rem;
}

.carousel-pagination-dot {
  height: 10px;
  padding: 2.5px;
  position: relative;
  width: 10px;
  &:after {
    background: white;
    border-radius: 50%;
    content: '';
    height: 5px;
    left: 50%;
    opacity: 0.35;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 5px;
  }
  &[aria-selected] {
    &:after {
      opacity: 1;
    }
  }
}

.carousel-navigation-arrow {
  background-color: white;
  box-shadow: inset 0 0 0 1px #f2f2f2;
  border-radius: 50%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  height: 51px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 51px;
  &:disabled {
    cursor: default;
  }
  &::after {
    background-image: url('~/assets/svg/arrow.svg');
    background-repeat: no-repeat;
    background-position: center;
    content: '';
    inset: 0;
    position: absolute;
  }
  &.previous {
    left: -1rem;
  }
  &.next {
    right: -1rem;
    &::after {
      transform: rotate(0.5turn);
    }
  }
}
</style>
