<template>
  <v-layout class="bg-purple">
    <v-app-bar height="80" flat>
      <MainHeader class="w-full"/>
    </v-app-bar>
    <v-main scrollable>
      <v-container fluid class="px-0">
        <div class="layout-container mx-auto">
          <slot></slot>
        </div>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import MainHeader from './MainHeader'
defineProps({})
</script>
