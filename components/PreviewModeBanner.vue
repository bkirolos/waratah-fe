<template>
  <client-only v-if="$nuxt.isPreview">
    <aside
      class="bg-lime bottom-0 shadow text-black fixed heading-display text-base text-center w-full"
    >
      <button class="pt-4 pb-2 py-3 uppercase w-full" @click="$nuxt.refresh()">
        You are currently in preview mode. Click here to refresh.
      </button>
    </aside>
  </client-only>
</template>
