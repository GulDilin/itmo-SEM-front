<template>
  <v-chip
    class=""
    :class="status.class"
  >
    {{ status.text }}
  </v-chip>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: { type: String },
  enum: { type: Object },
})

const status = computed(
  () => props.enum?.getByKey(props.text) || { text: props.text, key: props.text }
)
</script>
