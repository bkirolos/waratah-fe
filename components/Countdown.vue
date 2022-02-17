<template>
  <div>
    <p class="font-bold mb-4">Sale ends Feburary 20th at 10:00pm PST at 1ETH</p>
    <div class="flex space-x-10">
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
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  },
  computed: {
    endingTime() {
      return this.$dayjs('2022-02-20T22:00:00')
    },
    timeZone() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  },
  mounted() {
    this.initializeCountdown()
  },
  methods: {
    formatNumber(number) {
      return number?.toString().padStart(2, '0')
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
