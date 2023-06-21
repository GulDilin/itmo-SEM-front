<template>
  <div class="item-col">
    <v-btn
      v-if="!isOptionAdding"
      @click="isOptionAdding = true"
    >
      Добавить опцию
    </v-btn>
    <v-card v-if="isOptionAdding">
      <v-select
        v-model="optionOrderType"
        :items="orderTypesItems"
        item-value="id"
        item-title="name"
        variant="outlined"
        density="compact"
        class="tw-m-2"
      />
      <OrderForm
        v-if="optionOrderType"
        :user-customer="customerId"
        :parent-order-id="parentOrder?.id"
        :order-type="orderTypes?.findBy({ id: optionOrderType })"
        @created="onCreatedOption"
      />
    </v-card>
    <slot name="append" />
  </div>
</template>

<script setup>
import OrderForm from './OrderForm'
import { computed, inject, ref } from 'vue'

defineProps({
  parentOrder: Object,
  customerId: String,
})

const emit = defineEmits(['created'])
const isOptionAdding = ref(false)
const optionOrderType = ref()
const orderTypes = inject('orderTypes')
const orderTypesItems = computed(() => orderTypes.value?.filter(it => it.dep_type === 'DEPEND'))
const onCreatedOption = item => {
  optionOrderType.value = undefined
  isOptionAdding.value = false
  emit('created', item)
}
</script>

<style scoped lang="sass">
.item-col
  @apply tw-flex tw-w-full tw-flex-col tw-justify-start tw-w-[300px] tw-gap-2
</style>
