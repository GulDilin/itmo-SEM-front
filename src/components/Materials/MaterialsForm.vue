<template>
  <v-card
    class="tw-bg-light"
    title="Добавить материал"
  >
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="data.name"
          label="Наименование"
          density="compact"
          variant="outlined"
          :rules="[validators.rules.isRequired]"
          :disabled="loading"
          clearable
          @click.stop.prevent
        />
        <v-select
          v-model="data.value_type"
          :items="MaterialValueType.getValues()"
          item-title="text"
          item-value="key"
          label="Тип значения"
          density="compact"
          variant="outlined"
          :rules="[validators.rules.isRequired]"
          :disabled="loading"
          clearable
          @click.stop.prevent
        />
        <v-text-field
          v-model="data.amount"
          label="Количество"
          density="compact"
          variant="outlined"
          :rules="[validators.rules.isRequired, validators.rules.isInteger]"
          :disabled="loading"
          clearable
          @click.stop.prevent
        />
        <v-text-field
          v-model="data.item_price"
          label="Цена за единицу"
          density="compact"
          variant="outlined"
          :rules="[validators.rules.isRequired, validators.rules.isInteger]"
          :disabled="loading"
          clearable
          @click.stop.prevent
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
import { ref } from 'vue'
import api from '@/api'
import { MaterialValueType } from '@/enums'
import validators from '@/validators'

const props = defineProps({
  orderType: {
    type: Object,
    default: () => ({}),
  },
  order: {
    type: Object,
    default: () => ({}),
  },
  editableMaterial: Object,
})
const emit = defineEmits(['created', 'saved'])

const data = ref({
  name: '',
  amount: 0,
  value_type: '',
  item_price: 0,
})

const loading = ref()
const form = ref()

const confirmEdit = async () => {
  const validateResult = await form.value?.validate()
  if (!validateResult.valid) return
  loading.value = true
  try {
    const { data: updated } = await api.orderType
      .for(props.orderType?.id)
      .orders.for(props.order?.id)
      .materials.for(props.editableMaterial?.id)
      .update(data.value)
    emit('saved', updated)
  } finally {
    loading.value = false
  }
}
const confirmCreate = async () => {
  const validateResult = await form.value?.validate()
  if (!validateResult.valid) return
  loading.value = true
  try {
    const { data: created } = await api.orderType
      .for(props.orderType?.id)
      .orders.for(props.order.id)
      .materials.create(data.value)
    emit('created', created)
  } finally {
    loading.value = false
  }
}

const confirm = async () => {
  if (props.editableMaterial) confirmEdit()
  else confirmCreate()
}
</script>
