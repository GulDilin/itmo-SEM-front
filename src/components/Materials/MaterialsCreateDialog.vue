<template>
  <v-dialog width="500">
    <template #activator="{ props }">
      <v-btn v-bind="props"> Добавить материал </v-btn>
    </template>

    <template #default="{ isActive }">
      <MaterialsForm
        :order="order"
        :order-type="orderType"
        @created="
          () => {
            isActive.value = false
            emit('created')
          }
        "
      />
    </template>
  </v-dialog>
</template>

<script setup>
import MaterialsForm from './MaterialsForm.vue'

defineProps({
  orderType: {
    type: Object,
    default: () => ({}),
  },
  order: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['created'])
</script>
