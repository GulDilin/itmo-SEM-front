<template>
  <div
    :class="{
      'tw-p-2': showParentOrder && item?.parent_order_id,
      'tw-bg-brown': item?.order_type?.dep_type !== OrderDepType.DEFECT.key,
      'bg-error': item?.order_type?.dep_type === OrderDepType.DEFECT.key,
    }"
    class="tw-rounded-xl"
  >
    <v-card
      density="compact"
      :to="
        noLink || !item?.id
          ? undefined
          : { name: 'main-order-type-id', params: { type: item?.order_type?.name, id: item?.id } }
      "
    >
      <v-card-text>
        <div class="tw-pb-4 tw-text-center">
          {{ item?.order_type?.name }} {{ getDateTimeString(new Date(item.created_at)) }}
        </div>
        <div>id: {{ item.id }}</div>
        <div>Тип: {{ OrderDepType.getByKey(item?.order_type?.dep_type)?.text }}</div>
        <div class="tw-flex tw-items-center tw-gap-2 tw-py-2">
          Статус:
          <AppStatus
            :text="item.status"
            :enum="OrderStatus"
          />
        </div>
        <div class="tw-relative tw--mx-4 tw-bg-brown tw-bg-opacity-20 tw-px-4 tw-py-2">
          <div class="tw-absolute tw-top-2 tw-right-6">Заказчик</div>
          <UserCardWrapped
            :user-id="item?.user_customer"
            class="tw--mx-4"
          />
        </div>
        <div class="tw-relative tw-py-2">
          <div class="tw-absolute tw-top-2 tw-right-2">Исполнитель</div>
          <UserCardWrapped
            :user-id="item?.user_implementer"
            class="tw--mx-4"
          />
        </div>
        <div
          v-if="!editMode"
          class="tw-relative tw--m-4 tw-mt-0 tw-bg-brown tw-bg-opacity-50 tw-p-4"
        >
          <div
            v-if="editable && hasRole(ROLE.STAFF.key) && OrderStatus.NEW.key === item?.status"
            class="tw-absolute tw-top-2 tw-right-2"
          >
            <v-btn
              :icon="mdiPencil"
              @click.prevent="editMode = true"
            />
          </div>
          <div class="pb-2">Параметры</div>
          <div
            v-for="param in item?.order_type?.params"
            :key="param?.id"
            class="tw-flex tw-items-center tw-gap-2"
          >
            <span class="tw-min-w-[100px]">{{ param?.name }}:</span>
            <span>
              {{
                item?.params?.findBy({ order_type_param_id: param?.id })?.value || 'Не установлено'
              }}
            </span>
          </div>
          <div class="pt-2">Связанных заявок: {{ total }}</div>
        </div>
        <OrderForm
          v-if="editMode"
          :editable-order="item"
          :order-type="item?.order_type"
          @saved="onSave"
          @click.stop.prevent
        />
      </v-card-text>

      <v-card-actions v-if="hasRole(ROLE.STAFF.key)">
        <v-btn
          v-if="item?.status === OrderStatus.NEW.key"
          :loading="loading"
          @click.prevent="update(item.id, { status: OrderStatus.READY.key })"
        >
          Готово к выполнению
        </v-btn>
        <v-btn
          v-if="item?.status === OrderStatus.READY.key"
          :loading="loading"
          @click.prevent="
            update(item.id, {
              status: OrderStatus.IN_PROGRESS.key,
              user_implementer: tokenParsed.sub,
            })
          "
        >
          Принять к исполнению
        </v-btn>
        <v-btn
          v-if="item?.status === OrderStatus.IN_PROGRESS.key"
          :loading="loading"
          @click.prevent="update(item.id, { status: OrderStatus.DONE.key })"
        >
          Готово
        </v-btn>
        <v-btn
          v-if="item?.status === OrderStatus.DONE.key"
          :loading="loading"
          @click.prevent="update(item.id, { status: OrderStatus.ACCEPTED.key })"
        >
          Утвердить
        </v-btn>
        <v-btn
          v-if="
            item?.status === OrderStatus.DONE.key && $route?.name !== 'main-order-type-id-defect'
          "
          :to="{
            name: 'main-order-type-id-defect',
            params: { type: item?.order_type?.name, id: item?.id },
          }"
        >
          Отбраковать
        </v-btn>
        <div class="tw-grow"></div>
        <v-btn
          v-if="![OrderStatus.REMOVED.key, OrderStatus.TO_REMOVE.key].includes(item?.status)"
          color="error"
          class="tw-ml-auto"
          :loading="loading"
          @click.prevent="update(item.id, { status: OrderStatus.TO_REMOVE.key })"
        >
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>

    <div
      v-if="item?.parent_order_id && showParentOrder"
      class="tw-rounded-b-xl tw-p-4"
    >
      <div class="tw-mb-4 tw-px-4 tw-text-light">Основной</div>
      <v-progress-circular
        v-if="loadingParent"
        indeterminate
      />
      <!-- eslint-disable-next-line -->
      <OrderCard
        v-if="parentOrder"
        v-model:item="parentOrder"
      />
    </div>
  </div>
</template>

<script setup>
import OrderForm from './OrderForm'
import { mdiPencil } from '@mdi/js'
import { computed, ref } from 'vue'
import AppStatus from '@/components/App/AppStatus'
import UserCardWrapped from '@/components/Users/UserCardWrapped'
import { useApiCall } from '@/composables/useApiCall'
import { hasRole, tokenParsed } from '@/composables/useAuth'
import useItemsFetcher from '@/composables/useItemsFetcher'
import api from '@/api'
import { OrderDepType, OrderStatus, ROLE } from '@/enums'
import { getDateTimeString } from '@/utils/time'

const props = defineProps({
  item: Object,
  showParentOrder: {
    type: Boolean,
    default: false,
  },
  noLink: Boolean,
  editable: Boolean,
})
const emit = defineEmits(['update:item'])

const filter = computed(() => ({ parent_order_id: props.item?.id }))
const { get, getNext } = api.orders
const { total, fetchItemsStart } = useItemsFetcher(get, getNext, filter)
fetchItemsStart()

const { loading, call } = useApiCall(api.orderType.for(props.item?.order_type?.id).orders.update)
const update = async (it, v) => {
  try {
    const { data } = await call(it, v)
    if (!data) return
    emit('update:item', data)
  } catch {
    // ignore
  }
}

const parentOrder = ref()
const { loading: loadingParent, call: getOrder } = useApiCall(api.orders.getById)
if (props.item?.parent_order_id) {
  getOrder(props.item?.parent_order_id).then(({ data }) => {
    parentOrder.value = data
  })
}

const editMode = ref(false)
const onSave = it => {
  emit('update:item', it)
  editMode.value = false
}
</script>
