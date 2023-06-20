<template>
  <div :class="[$style.panel, $style[mode]]">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  mode: {
    type: String,
    default: 'vertical',
    validator: v => ['vertical', 'horizontal'].includes(v),
  },
})
</script>

<style module lang="sass">
.panel
  @apply tw-flex
  &.vertical
    @apply tw-flex-col tw-overflow-y-auto tw-min-h-0
  &.horizontal
    @apply tw-flex-row tw-overflow-x-auto tw-min-w-0
</style>
