<template>
  <v-card class="tw-bg-light">
    <v-card-title>
      {{ orderType.name }}
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-for="param in orderType?.params"
          :key="param?.id"
          v-model="data[param?.name]"
          :label="param?.name"
          density="compact"
          variant="outlined"
          required
          :disabled="loading"
          clearable
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
import { ref, watch } from 'vue'
import { tokenParsed } from '@/composables/useAuth'
import api from '@/api'

const props = defineProps({
  orderType: {
    type: Object,
    default: () => ({}),
  },
  userCustomer: String,
  parentOrderId: String,
})
const emit = defineEmits(['created'])

const data = ref({})
watch(
  () => props.orderType,
  v => {
    data.value = {}
    v?.params?.forEach(({ name }) => (data.value[name] = undefined))
  }
)

const loading = ref()
const confirm = async () => {
  console.log({ confirm: { ...data.value } })
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
</script>
