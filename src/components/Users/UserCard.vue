<template>
  <v-list-item
    :title="item?.username"
    :subtitle="roleNames"
    class="tw-rounded-xl"
    rounded="lg"
  >
    <template #prepend>
      <v-progress-circular
        v-if="loading"
        size="40"
        indeterminate
      />
      <v-avatar
        v-else
        size="40"
        color="primary"
      >
        <span class="!tw-text-light">
          {{ item?.username?.[0] }}
        </span>
      </v-avatar>
    </template>
  </v-list-item>
</template>

<script setup>
import { computed } from 'vue'
import { getRolesString } from '@/enums'

const props = defineProps({
  item: Object,
  loading: Boolean,
})

const roleNames = computed(() => getRolesString(props.item?.roles))
</script>
