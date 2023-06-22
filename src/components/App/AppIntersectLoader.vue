<script setup>
import AppIntersect from '@/components/App/AppIntersect'

defineProps({
  loading: { type: Boolean, default: false },
})
defineEmits(['shown'])
</script>

<template>
  <AppIntersect @shown="$emit('shown')">
    <v-progress-circular
      v-if="loading"
      indeterminate
    />
  </AppIntersect>
</template>
