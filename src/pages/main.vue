<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<route>
  {
    meta: {
      requiredAuth: false,
    }
  }
</route>

<script setup>
import MainLayout from '@/layout/MainLayout.vue'
</script>
