<template>
  <div v-if="countdownLive">
    <h2 class="body font-bold mb-4">
      Sale ends on {{ this.displayDate }} at 1ETH
    </h2>
    <div class="flex justify-between md:space-x-10 md:w-min">
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
  data() {
    return {
      hours: '-',
      minutes: '-',
      seconds: '-'
    }
  },
  computed: {
    countdownLive() {
      return this.$dayjs() < this.endingTime
    },
    displayDate() {
      return this.endingTime.format('MMMM Do [at] h:mm A')
    },
    endingTime() {
      return this.$dayjs(this.$config.auctionEndTime)
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
      const currentTime = this.$dayjs().tz(this.timeZone)
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
