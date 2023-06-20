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
          v-model="data[param?.id]"
          :label="param?.name"
          density="compact"
          variant="outlined"
          clearable
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="confirm"> Подтвердить </v-btn>
    </v-card-actions>
  </v-card>
  <!--     <div class="tw-mb-4">{{ orderType.name }}</div>
    <v-text-field
      v-for="param in orderType?.params"
      :key="param?.id"
      v-model="data[param?.id]"
      :label="param?.name"
      density="compact"
      variant="outlined"
      clearable
    />
    <v-btn
      @click="confirm"
    >
      Подтвердить
    </v-btn>
  </v-form> -->
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  orderType: {
    type: Object,
    default: () => ({}),
  },
})

const data = ref({})
watch(
  () => props.orderType,
  v => {
    data.value = {}
    v?.params?.forEach(({ id }) => (data.value[id] = undefined))
  }
)
const confirm = () => {
  console.log({ confirm: { ...data.value } })
}
</script>
