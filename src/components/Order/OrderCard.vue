<template>
  <v-card density="compact">
    <v-card-text>
      <div class="tw-pb-4 tw-text-center">
        {{ item?.order_type?.name }} {{ getDateTimeString(new Date(item.created_at)) }}
      </div>
      <div>id: {{ item.id }}</div>
      <div>Статус: {{ item.status }}</div>
      <div class="tw-relative tw--mx-4 tw-bg-brown tw-bg-opacity-20 tw-px-4 tw-py-2">
        <div class="tw-absolute tw-top-2 tw-right-6">Заказчик</div>
        <UserCardWrapped
          :user-id="item?.user_customer"
          class="tw--mx-4"
        />
      </div>
      <div class="tw-relative tw-py-2">
        <div class="tw-absolute tw-top-2 tw-right-2">Исполнитель</div>
        <UserCardWrapped
          :user-id="item?.user_implementer"
          class="tw--mx-4"
        />
      </div>
      <div class="tw--m-4 tw-mt-0 tw-bg-brown tw-bg-opacity-50 tw-p-4">
        <div class="pb-2">Параметры</div>
        <div
          v-for="param in item?.order_type?.params"
          :key="param?.id"
          class="tw-flex tw-items-center tw-gap-2"
        >
          <div class="tw-min-w-[100px]">{{ param?.name }}:</div>
          <div>
            {{
              item?.params?.findBy({ order_type_param_id: param?.id })?.value || 'Не установлено'
            }}
          </div>
        </div>
        <div class="pt-2">Связанных заявок: {{ total }}</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import UserCardWrapped from '@/components/Users/UserCardWrapped'
import useItemsFetcher from '@/composables/useItemsFetcher'
import api from '@/api'
import { getDateTimeString } from '@/utils/time'

const props = defineProps({
  item: Object,
})

const filter = computed(() => ({ parent_order_id: props.item?.id }))
const { get, getNext } = api.orders
const { total, fetchItemsStart } = useItemsFetcher(get, getNext, filter)
fetchItemsStart()
</script>
