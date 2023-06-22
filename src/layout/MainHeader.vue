<template>
  <div class="tw-flex tw-justify-center tw-bg-primary">
    <div class="tw-flex tw-items-center tw-gap-4 tw-py-4 tw-text-theme-light tw-layout-container">
      <div class="tw-flex-none tw-text-xl tw-font-bold">САС-ИП-СА</div>
      <div class="tw-grow"></div>
      <v-menu>
        <template #activator="{ props }">
          <div class="tw-rounded-xl">
            <v-list-item
              v-bind="props"
              append-avatar="https://randomuser.me/api/portraits/men/1.jpg"
              :title="tokenParsed?.preferred_username"
              :subtitle="rolesStr"
              class="tw-rounded-xl"
              rounded="lg"
            />
          </div>
        </template>
        <template #default>
          <v-card class="tw-p-2">
            <v-list>
              <v-list-item
                density="compact"
                :href="keycloak?.createAccountUrl()"
                :prepend-icon="mdiAccount"
              >
                Profile page
              </v-list-item>
              <v-list-item
                density="compact"
                :prepend-icon="mdiLogout"
                @click="keycloak?.logout()"
              >
                Logout
              </v-list-item>
            </v-list>
          </v-card>
        </template>
      </v-menu>
    </div>
  </div>
</template>

<script setup>
import { mdiAccount, mdiLogout } from '@mdi/js'
import { computed } from 'vue'
import { keycloak, tokenParsed } from '@/composables/useAuth'
import { getRolesString } from '@/enums'

const rolesStr = computed(() => getRolesString(tokenParsed.value?.roles))
</script>
