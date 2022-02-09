<template>
  <div id="mc_embed_signup">
    <form
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      :action="endpoint"
      method="post"
      novalidate
      class="max-w-xl"
      @submit.prevent
    >
      <h3 v-if="heading" class="body normal-case input-label">{{ heading }}</h3>
      <div class="flex items-end">
        <div class="flex-1">
          <label for="email" class="visually-hidden">Email address</label>
          <input
            id="email"
            v-model="email"
            name="EMAIL"
            type="email"
            placeholder="Enter your email address"
            class="input w-full"
          />
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </div>
      <div id="mce-responses" class="text-xs mt-2">
        <span id="mce-error-response" style="display: none"></span>
        <span id="mce-success-response" style="display: none"></span>
      </div>
      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
      <div style="position: absolute; left: -5000px" aria-hidden="true">
        <input
          type="text"
          name="b_d7b601fa5cde1120e8ea47f96_43a36763eb"
          value=""
          tabindex="-1"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    audienceId: {
      type: String,
      default: 'e460024be0'
    },
    heading: {
      type: String,
      default: ''
    },
    userId: {
      type: String,
      default: 'dadb772e1467f32da9f68f3bc'
    }
  },
  data() {
    return {
      email: ''
    }
  },
  head: {
    script: [
      {
        src: '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js',
        body: true
      }
    ]
  },
  computed: {
    endpoint() {
      return `https://divisionst.us14.list-manage.com/subscribe/post?u=${this.userId}&id=${this.audienceId}`
    }
  }
}
</script>
