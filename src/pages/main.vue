<template>
  <MainLayout>
    <Dummy />
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
import Dummy from '@/components/Dummy'
import MainLayout from '@/layout/MainLayout.vue'
</script>
