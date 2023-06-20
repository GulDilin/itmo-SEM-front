<template>
  <UserCard
    :loading="loading"
    :item="user"
  />
</template>

<script setup>
import UserCard from './UserCard'
import { ref, watch } from 'vue'
import { useApiCall } from '@/composables/useApiCall'
import api from '@/api'

const props = defineProps({
  userId: {
    type: String,
  },
})
const user = ref()
const { call, loading } = useApiCall(api.users.getById)
watch(
  () => props.userId,
  async v => {
    if (!v) {
      user.value = undefined
      return
    }
    const { data } = await call(v, { _dontShowError: true })
    user.value = data
  },
  { immediate: true }
)
</script>
