import orderType from './orderType'
import useBasicApi from './useBasicApi'
import users from './users'
import config from '@/config'

const axios = config.urls.AXIOS_API

export default {
  orderType,
  users,
  orders: {
    ...useBasicApi(axios, 'order'),
  },
}
