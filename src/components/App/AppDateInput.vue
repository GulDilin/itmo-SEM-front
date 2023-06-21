<template>
  <v-menu
    v-model="isOpen"
    :close-on-content-click="false"
    eager
  >
    <template #activator="{ props: propsV }">
      <v-text-field
        v-bind="propsV"
        :model-value="updatableValue"
        :label="label"
        :density="density"
        :variant="variant"
        :rules="rules"
        :disabled="disabled"
        :clearable="clearable"
        readonly
      />
    </template>

    <template #default>
      <v-date-picker
        v-model="date"
        @click:save="save"
        @click:cancel="close"
      />
    </template>
  </v-menu>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import useUpdatableValue from '@/composables/useUpdatableValue'

const props = defineProps({
  modelValue: String,
  label: String,
  density: String,
  variant: String,
  rules: Array,
  disabled: Boolean,
  clearable: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const { modelValue } = toRefs(props)
const { updatableValue } = useUpdatableValue(modelValue, emit, {
  updateEventName: 'update:modelValue',
})
const date = ref()
const isOpen = ref(false)
const close = (isOpen.value = false)
const save = () => {
  setTimeout(() => (updatableValue.value = date.value?.[0]), 20)
  isOpen.value = false
}
</script>
