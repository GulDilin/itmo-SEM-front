<template>
  <div></div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
router.replace({ name: 'main' })
</script>
