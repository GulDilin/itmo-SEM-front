<script setup>
import useItemsFetcher from '@/composables/useItemsFetcher'
import api from '@/api'

const { get, getNext } = api.order
const { items, loading, fetchItemsStart, fetchItemsNext } = useItemsFetcher(get, getNext)

fetchItemsStart()
</script>

<template>
  <div class="flex flex-col">
    <v-card v-for="item in items" :key="item.id">
      <v-card-title>{{ item.id }}</v-card-title>
    </v-card>
  </div>
</template>
