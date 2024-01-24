<template>
  <v-card class="tw-bg-light">
    <v-card-title>
      Список материалов
      <MaterialCreateDialog
        :order-type="orderType"
        :order="order"
        @created="fetchItemsAll()"
      />
    </v-card-title>
    <v-card-text>
      <v-data-table-virtual
        :headers="headers"
        :items="items"
        :loading="loading"
        :search="search"
        item-value="id"
        density="compact"
      >
        <template #item.value_type="{ item }">
          {{ MaterialValueType.getByKey(item.selectable?.value_type)?.text }}
        </template>
        <template #item.summ="{ item }">
          {{ countCost(item.selectable) }}
        </template>
        <template #item.actions="{ item }">
          <v-btn
            color="error"
            :loading="loadingDelete"
            variant="text"
            @click="removeMaterial(item.selectable?.id)"
          >
            Удалить
          </v-btn>
        </template>
      </v-data-table-virtual>
      <div class="tw-px-4">Итого: {{ summ }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import MaterialCreateDialog from './MaterialsCreateDialog.vue'
import { computed, ref } from 'vue'
import { VDataTableVirtual } from 'vuetify/labs/VDataTable'
import useItemsFetcher from '@/composables/useItemsFetcher'
import api from '@/api'
import { MaterialValueType } from '@/enums'

const props = defineProps({
  orderType: {
    type: Object,
    default: () => ({}),
  },
  order: {
    type: Object,
    default: () => ({}),
  },
})

const { get, getNext } =
  props.api || api.orderType.for(props.orderType?.id).orders.for(props.order?.id).materials
const { items, loading, fetchItemsAll } = useItemsFetcher(get, getNext)

const countCost = item => +item?.item_price * +item?.amount
const summ = computed(() => items.value?.map(countCost)?.reduce((acc, cur) => acc + cur, 0) ?? 0)
fetchItemsAll()

const loadingDelete = ref(false)
const removeMaterial = materialId => {
  loadingDelete.value = true
  api.orderType
    .for(props.orderType?.id)
    .orders.for(props.order?.id)
    .materials.for(materialId)
    .remove()
    .finally(() => {
      loadingDelete.value = false
      fetchItemsAll()
    })
}

const headers = [
  {
    title: 'Наименование',
    align: 'start',
    sortable: true,
    key: 'name',
  },
  {
    title: 'Тип значения',
    align: 'start',
    sortable: true,
    key: 'value_type',
  },
  {
    title: 'Количество',
    align: 'start',
    sortable: true,
    key: 'amount',
  },
  {
    title: 'Цена за единицу',
    align: 'start',
    sortable: true,
    key: 'item_price',
  },
  {
    title: 'Сумма',
    align: 'end',
    key: 'summ',
  },
  {
    title: '',
    align: 'end',
    key: 'actions',
  },
]
const search = ref('')
</script>
