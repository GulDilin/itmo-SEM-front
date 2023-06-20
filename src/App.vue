<template>
  <div
    id="page-content"
    class="min-w-screen flex min-h-screen w-full grow flex-col"
  >
    <div
      id="absolute-target"
      class="z-50"
    />
    <RouterView />
  </div>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()
theme.global.name.value = 'light'
defineProps({})
</script>
