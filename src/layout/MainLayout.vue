<template>
  <div :class="[$style.layout, { [$style.noScroll]: $route.meta.layoutNoScroll }]">
    <div :class="$style.contentLayoutWrapper">
      <div :class="$style.contentWrapper">
        <MainHeader></MainHeader>
        <div class="bg-black text-white">Main layout</div>
        <div class="flex-col items-start p-4 text-black">
          <v-icon icon="mdi-home" />
          <v-text-field label="Label" variant="outlined" density="compact" clearable />
        </div>
        <div :class="$style.content"><slot /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { mdiAccount  } from '@mdi
import MainHeader from './MainHeader'
defineProps({})
</script>

<style module lang="sass">
.layout
  @apply h-screen
  &.noScroll
    .content, .layout, .contentWrapper
      @apply overflow-hidden
  &:not(.noScroll)
    .contentLayoutWrapper
      @apply overflow-y-auto
.content, .layout, .contentLayoutWrapper, .contentWrapper
  @apply flex flex-col grow min-h-0
.contentWrapper
  @apply layout-container mx-auto self-center
.contentLayoutWrapper
  @apply min-h-0
</style>
