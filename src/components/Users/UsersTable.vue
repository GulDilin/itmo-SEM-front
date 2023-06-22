<template>
  <div class="tw-rounded-xl tw-bg-white tw-pb-2">
    <div class="tw-p-2">
      <v-text-field
        v-model="search"
        :append-icon="mdiMagnify"
        label="Search"
        variant="outlined"
        density="compact"
        hide-details
      />
    </div>
    <v-data-table-virtual
      :headers="headers"
      :items="items"
      :loading="loading"
      :search="search"
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
          :item="item"
        />
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script setup>
import { mdiMagnify } from '@mdi/js'
import { ref, toRef } from 'vue'
import { VDataTableVirtual } from 'vuetify/labs/VDataTable'
import useItemsFetcher from '@/composables/useItemsFetcher'
import api from '@/api'

const props = defineProps({
  filter: Object,
})
const filter = toRef(props, 'filter')
const { get, getNext } = api.users
const { items, loading, fetchItemsAll } = useItemsFetcher(get, getNext, filter)

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
const search = ref('')

fetchItemsAll()
</script>
