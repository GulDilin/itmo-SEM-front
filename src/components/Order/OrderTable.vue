<script setup>
import OrderCard from './OrderCard'
import { computed, toRef, watch } from 'vue'
import AppIntersectLoader from '@/components/App/AppIntersectLoader'
import useItemsFetcher from '@/composables/useItemsFetcher'
import api from '@/api'

const props = defineProps({
  orderType: {
    type: Object,
  },
  showParentOrder: {
    type: Boolean,
    default: false,
  },
  api: {
    type: Object,
  },
  filter: Object,
})
const emit = defineEmits(['update:loading'])

const filter = toRef(props, 'filter')
const filterV = computed(() => ({ ...filter.value, sort: '-created_at' }))
const { get, getNext } = props.api || api.orderType.for(props.orderType?.id).orders
const { items, loading, fetchItemsStart, fetchItemsNext } = useItemsFetcher(get, getNext, filterV)

fetchItemsStart()

watch(loading, v => emit('update:loading', v))

defineExpose({ refresh: fetchItemsStart })
</script>

<template>
  <div class="tw-grid tw-grid-cols-2 tw-gap-4 tw-rounded-xl">
    <slot name="prepend" />
    <OrderCard
      v-for="(item, i) in items"
      :key="item.id"
      v-model:item="items[i]"
      :show-parent-order="showParentOrder"
    />
    <AppIntersectLoader @shown="fetchItemsNext" />
  </div>
</template>
