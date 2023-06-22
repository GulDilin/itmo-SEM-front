<template>
  <TransitionGroup
    class="notifications-container tw-pointer-events-none"
    name="list-transition"
    tag="div"
  >
    <v-alert
      v-for="{ id, title, text, type, to } in notifications"
      :key="id"
      :type="type"
      :title="title"
      :to="to"
      class="tw-pointer-events-auto tw-m-2"
      @close="removeById(id)"
    >
      {{ text }} {{ to ? '(click to open)' : '' }}
    </v-alert>
  </TransitionGroup>
</template>

<script setup>
import { notifications, removeById } from '@/composables/useNotifications'
</script>

<style scoped lang="sass">
.notifications-container
  @apply tw-absolute tw-top-0 tw-pt-12 tw-right-0 tw-w-full sm:tw-w-1/2 md:tw-w-1/3 lg:tw-w-4/12 tw-h-screen
  @apply tw-z-50 tw-overflow-y-scroll tw-overflow-x-hidden tw-pt-20
</style>
