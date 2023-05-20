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
  @apply flex
  &.vertical
    @apply flex-col overflow-y-auto min-h-0
  &.horizontal
    @apply flex-row overflow-x-auto min-w-0
</style>
