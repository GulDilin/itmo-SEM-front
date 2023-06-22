<template>
  <v-card class="tw-bg-light">
    <v-card-title>
      {{ orderType.name }}
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <OrderFormField
          v-for="param in orderType?.params"
          :key="param?.id"
          v-model="data[param?.id]"
          :param="param"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        :loading="loading"
        @click="confirm"
      >
        Подтвердить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import OrderFormField from './OrderFormField'
import { ref, watch } from 'vue'
import { tokenParsed } from '@/composables/useAuth'
import api from '@/api'

const props = defineProps({
  orderType: {
    type: Object,
    default: () => ({}),
  },
  editableOrder: Object,
  userCustomer: String,
  parentOrderId: String,
})
const emit = defineEmits(['created', 'saved'])

const data = ref({})
watch(
  () => props.orderType,
  v => {
    data.value = {}
    v?.params?.forEach(({ id }) => (data.value[id] = undefined))
    if (props.editableOrder) {
      props.editableOrder?.params?.forEach(
        ({ value, order_type_param_id }) => (data.value[order_type_param_id] = value)
      )
    }
  },
  { immediate: true }
)

const loading = ref()
const form = ref()

const confirmEdit = async () => {
  const validateResult = await form.value?.validate()
  if (!validateResult.valid) return
  const params = await Promise.all(
    Object.entries(data.value)
      .filter(([, value]) => !!value)
      .map(([key, value]) =>
        api.orderType
          .for(props.orderType?.name)
          .orders.for(props.editableOrder?.id)
          .params.for(key)
          .update({ value })
      )
  )
  emit('saved', { ...props.editableOrder, params: params?.map(it => it.data) })
}
const confirmCreate = async () => {
  const validateResult = await form.value?.validate()
  if (!validateResult.valid) return
  loading.value = true
  try {
    const { data: created } = await api.orderType.for(props.orderType?.id).orders.create({
      user_customer: props.userCustomer,
      user_implementer: tokenParsed.value?.sub,
      parent_order_id: props.parentOrderId,
      order_type_id: props.orderType?.id,
    })
    const params = await Promise.all(
      Object.entries(data.value)
        .filter(([, value]) => !!value)
        .map(([key, value]) =>
          api.orderType
            .for(props.orderType?.name)
            .orders.for(created?.id)
            .params.for(key)
            .create({ value })
        )
    )
    created.order_type = props.orderType
    created.params = params?.map(it => it.data)
    emit('created', created)
  } finally {
    loading.value = false
  }
}

const confirm = async () => {
  if (props.editableOrder) confirmEdit()
  else confirmCreate()
}
</script>
