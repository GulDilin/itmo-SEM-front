<template>
  <RouterView />
</template>

<script setup>
import { useRouter } from 'vue-router'

useRouter().replace({ name: 'main-order' })
</script>
