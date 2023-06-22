<template>
  <component
    :is="tag"
    ref="root"
  >
    <slot />
  </component>
</template>

<script setup>
import useIntersectionObserver from '@/composables/observer/useIntersectionObserver'

defineProps({ tag: { type: String, default: 'div' } })
const emit = defineEmits(['intersected', 'shown', 'hidden'])
const { root } = useIntersectionObserver(ev => {
  emit('intersected', ev)
  if (ev.isIntersecting) emit('shown', ev)
  else emit('hidden', ev)
})
</script>
