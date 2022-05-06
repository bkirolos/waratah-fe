<template>
  <div>
    <h2 class="body font-bold mb-4">{{ headerText }}</h2>
    <div
      v-if="countdownLive"
      class="flex justify-between md:space-x-10 md:w-min"
    >
      <p class="flex flex-col space-y-2">
        <span class="heading-4">{{ formatNumber(hours) }}</span>
        <span class="heading-6">Hours</span>
      </p>
      <p class="flex flex-col space-y-2">
        <span class="heading-4">{{ formatNumber(minutes) }}</span>
        <span class="heading-6">Minutes</span>
      </p>
      <p class="flex flex-col space-y-2">
        <span class="heading-4">{{ formatNumber(seconds) }}</span>
        <span class="heading-6">Seconds</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    startTime: {
      type: Number,
      default: null
    },
    endTime: {
      type: Number,
      required: true
    },
    completedText: {
      type: String,
      default: null
    },
    liveText: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      hours: '-',
      minutes: '-',
      seconds: '-',
      currentTime: null
    }
  },
  computed: {
    countdownLive() {
      return this.currentTime && !this.countdownEnded && this.countdownStarted
    },
    countdownEnded() {
      return this.currentTime > this.endingTime
    },
    countdownStarted() {
      return this.currentTime >= this.startingTime
    },
    displayEndTime() {
      return this.endingTime.format('MMMM Do [at] h:mm A z')
    },
    displayStartTime() {
      return this.startingTime.format('MMMM Do [at] h:mm A z')
    },
    endingTime() {
      return this.$dayjs.unix(this.endTime)
    },
    headerText() {
      return this.countdownEnded ? this.completedText : this.liveText
    },
    startingTime() {
      return this.startTime
        ? this.$dayjs.unix(this.startTime)
        : this.$dayjs()
    },
    timeZone() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  },
  mounted() {
    this.initializeCountdown()
  },
  methods: {
    formatNumber(value) {
      if (typeof value === 'number') {
        return value?.toString().padStart(2, '0')
      } else {
        return value
      }
    },
    getTimeRemaining() {
      this.currentTime = this.$dayjs().tz(this.timeZone)
      const currentTime = this.$dayjs().tz('America/Los_Angeles')
      return this.endingTime.diff(currentTime)
    },
    initializeCountdown() {
      const countdown = setInterval(() => {
        const timeRemaining = this.getTimeRemaining()
        if (timeRemaining <= 0) {
          clearInterval(countdown)
        } else {
          this.updateTime(timeRemaining)
        }
      }, 1000)
    },
    updateTime(time) {
      this.hours = Math.floor((time / (1000 * 60 * 60)) % 24)
      this.minutes = Math.floor((time / 1000 / 60) % 60)
      this.seconds = Math.floor((time / 1000) % 60)
    }
  }
}
</script>
