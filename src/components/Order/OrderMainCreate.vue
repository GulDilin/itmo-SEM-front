<template>
  <div class="tw-relative">
    <v-timeline
      direction="horizontal"
      side="end"
      line-color="#443850"
    >
      <v-timeline-item
        :icon="step > 1 ? mdiCheck : undefined"
        :dot-color="step > 1 ? activeColor : baseColor"
        :icon-color="step > 1 ? baseColor : activeColor"
        class="w-[300px]"
        height="400"
      >
        <template #opposite>
          <span class="item-title">Заказчик</span>
        </template>
        <template #default>
          <div class="item-col">
            <v-card v-if="customer">
              <UserCard
                class="tw-my-2"
                :item="customer"
              />
              <v-card-actions v-if="step === 1">
                <v-btn @click="confirmCustomer">Подтвердить</v-btn>
                <v-btn @click="unselectCustomer">Изменить</v-btn>
              </v-card-actions>
            </v-card>
            <UsersTable v-if="!customer">
              <template #item.actions="{ item }">
                <v-btn
                  density="compact"
                  @click="selectCustomer(item)"
                >
                  Выбрать
                </v-btn>
              </template>
            </UsersTable>
          </div>
        </template>
      </v-timeline-item>

      <v-timeline-item
        :icon="step > 2 ? mdiCheck : undefined"
        :dot-color="step > 2 ? activeColor : baseColor"
        :icon-color="step > 2 ? baseColor : activeColor"
        height="400"
      >
        <template #opposite>
          <span class="item-title">Заявка</span>
        </template>
        <template #default>
          <div class="item-col">
            <OrderForm
              v-show="step === 2"
              :user-customer="customer?.id"
              :order-type="orderType"
              @created="onCreated"
            />
            <OrderCard
              v-if="mainOrder"
              v-model:item="mainOrder"
            />
          </div>
        </template>
      </v-timeline-item>

      <v-timeline-item
        :icon="step > 3 ? mdiCheck : undefined"
        :dot-color="step > 3 ? activeColor : baseColor"
        :icon-color="step > 3 ? baseColor : activeColor"
        height="400"
      >
        <template #opposite>
          <span class="item-title">Опции</span>
        </template>
        <template #default>
          <OrderFormOption
            v-if="step > 2"
            :parent-order="mainOrder"
            :customer-id="customer?.id"
            @created="fetchItemsStart"
          >
            <template #append>
              <OrderCard
                v-for="(item, i) in subOrders"
                :key="item?.id"
                v-model:item="subOrders[i]"
              />
              <AppIntersectLoader @shown="fetchItemsNext" />
            </template>
          </OrderFormOption>
        </template>
      </v-timeline-item>
    </v-timeline>

    <div
      v-if="mainOrder"
      class="tw-fixed tw-right-4 tw-bottom-4"
    >
      <v-btn
        color="white"
        :to="{ name: 'main-order-type-id', params: { ...$route.params, id: mainOrder.id } }"
      >
        Завершить
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import OrderCard from './OrderCard'
import OrderForm from './OrderForm'
import OrderFormOption from './OrderFormOption'
import { mdiCheck } from '@mdi/js'
import { computed, ref } from 'vue'
import AppIntersectLoader from '@/components/App/AppIntersectLoader'
import UserCard from '@/components/Users/UserCard'
import UsersTable from '@/components/Users/UsersTable'
import useItemsFetcher from '@/composables/useItemsFetcher'
import api from '@/api'

defineProps({
  orderType: {
    type: Object,
    default: () => ({}),
  },
  // orderTypes: {
  //   type: Object,
  //   default: () => ([]),
  // },
})

const baseColor = '#443850'
const activeColor = 'success'
const step = ref(1)
const customer = ref()
const unselectCustomer = () => {
  customer.value = undefined
  step.value = 1
}
const selectCustomer = item => {
  customer.value = item.raw
}
const confirmCustomer = () => {
  step.value += 1
}

const mainOrder = ref()
const onCreated = async item => {
  mainOrder.value = item
  step.value += 1
  fetchItemsStart()
}
const filter = computed(() => ({ sort: '-created_at', parent_order_id: mainOrder.value?.id }))
const { get, getNext } = api.orders
const { items: subOrders, fetchItemsStart, fetchItemsNext } = useItemsFetcher(get, getNext, filter)
</script>

<style scoped lang="sass">
.item-col
  @apply tw-flex tw-w-full tw-flex-col tw-justify-start tw-w-[300px] tw-gap-2
.item-title
  @apply tw-text-light
</style>
