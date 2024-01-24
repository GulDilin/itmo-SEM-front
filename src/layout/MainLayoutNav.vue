<template>
  <v-navigation-drawer
    color=""
    elevation="3"
    class="!tw-bg-primary tw-bg-opacity-50"
    width="300"
  >
    <v-list>
      <v-list-subheader
        class="tw-w-full tw-text-light"
        max-width="250"
      >
        <span class="tw--ml-3 !tw-text-light tw-pl-layout-container"> Заявки </span>
      </v-list-subheader>
      <v-divider />
      <v-list-item
        v-for="item in items"
        :key="item.id"
        :title="item.name"
        :to="{ name: 'main-order-type', params: { type: item.name } }"
        class="tw-pl-layout-container"
      >
        <template #title>
          <span class="tw--ml-3 !tw-text-light tw-pl-layout-container">
            {{ item.name }}
          </span>
        </template>
      </v-list-item>
      <v-progress-circular
        v-if="loading"
        indeterminate
        class="tw-m-2"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'
import useItemsFetcher from '@/composables/useItemsFetcher'
import api from '@/api'

const emit = defineEmits(['update:order-types'])

const filter = ref({ sort: 'created_at' })
const { get, getNext } = api.orderType
const { items, loading, fetchItemsAll } = useItemsFetcher(get, getNext, filter)
fetchItemsAll()
watch(items, v => emit('update:order-types', v), { immediate: true })
</script>
