<template>
  <v-layout>
    <v-app-bar
      height="80"
      elevation="3"
    >
      <MainHeader class="tw-w-full" />
    </v-app-bar>
    <MainLayoutNav @update:order-types="orderTypes = $event" />

    <v-main
      scrollable
      class="tw-bg-theme-purple"
    >
      <v-container
        fluid
        class="px-0"
      >
        <div class="tw-mx-auto tw-layout-container">
          <slot></slot>
        </div>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import MainHeader from './MainHeader'
import MainLayoutNav from './MainLayoutNav'
import { provide, ref, watch } from 'vue'

const orderTypes = ref()
provide('orderTypes', orderTypes)
watch(orderTypes, v => console.log({ orderTypesLayout: v }), { immediate: true })
</script>
