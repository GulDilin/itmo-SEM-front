<template>
  <div class="tw-rounded-xl">
    <v-data-table-virtual
      :headers="headers"
      :items="items"
      :loading="loading"
      item-value="id"
      density="compact"
    >
      <template #item.username="{ item }">
        <div class="tw-flex tw-items-center tw-gap-4">
          <v-avatar
            size="32"
            color="primary"
          >
            <span class="!tw-text-light">
              {{ item.columns?.username?.[0] }}
            </span>
          </v-avatar>
          <div>{{ item.columns?.username }}</div>
        </div>
      </template>
      <template #item.actions="{ item }">
        <slot
          name="item.actions"
          :item="item.columns"
        />
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script setup>
import { VDataTableVirtual } from 'vuetify/labs/VDataTable'
import useItemsFetcher from '@/composables/useItemsFetcher'
import api from '@/api'

const { get, getNext } = api.users
const { items, loading, fetchItemsAll } = useItemsFetcher(get, getNext)

const headers = [
  {
    title: 'Имя',
    align: 'start',
    sortable: true,
    key: 'username',
  },
  {
    title: 'Действия',
    align: 'end',
    key: 'actions',
  },
]

fetchItemsAll()
</script>
