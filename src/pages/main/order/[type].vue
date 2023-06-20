<template>
  <div>
    <div>
      {{ type }}
    </div>
    <v-progress-circular
      v-if="loading"
      indeterminate
      class="tw-m-2"
    />
    <v-alert v-if="error">Произошла ошибка</v-alert>
    <!-- <div>
      {{ orderType }}
    </div> -->
    <v-dialog
      v-if="success"
      width="400"
    >
      <template #activator="{ props }">
        <v-btn v-bind="props">Создать</v-btn>
      </template>
      <template #default>
        <OrderForm :order-type="orderType"></OrderForm>
      </template>
    </v-dialog>
    <UsersTable></UsersTable>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import OrderForm from '@/components/Order/OrderForm'
import UsersTable from '@/components/Users/UsersTable'
import { useApiCall } from '@/composables/useApiCall'
import api from '@/api'

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
})

const orderType = ref()
const { call: getById, loading, error, success } = useApiCall(api.orderType.getById)
watch(
  () => props.type,
  async v => {
    orderType.value = (await getById(v))?.data
    console.log({ orderType: orderType.value })
  },
  { immediate: true }
)
</script>
