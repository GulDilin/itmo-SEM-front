<template>
  <component
    :is="component"
    :model-value="modelValue"
    :label="param?.name"
    density="compact"
    variant="outlined"
    :rules="rules"
    :disabled="loading"
    clearable
    @update:model-value="emit('update:model-value', $event)"
  />
</template>

<script setup>
import { computed, ref } from 'vue'
import AppDateInput from '@/components/App/AppDateInput'
import { OrderParamType } from '@/enums'
import validators from '@/validators'

const props = defineProps({
  param: Object,
  modelValue: String,
  loading: Boolean,
})
const emit = defineEmits(['update:model-value'])

const rules = computed(() => {
  const result = []
  if (props.param?.required) result.push(validators.rules.isRequired)
  if (props.param?.value_type === OrderParamType.INT) result.push(validators.rules.isInteger)
  return result
})
console.log({ param: props.param })
const typeComponent = {
  [OrderParamType.INT]: 'v-text-field',
  [OrderParamType.STR]: 'v-text-field',
  [OrderParamType.TEXT]: 'v-textarea',
  [OrderParamType.DATE]: AppDateInput,
}
const component = computed(() => typeComponent[props.param?.value_type] ?? 'v-text-field')
</script>
