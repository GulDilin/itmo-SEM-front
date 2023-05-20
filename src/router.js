import { createRouter, createWebHistory } from 'vue-router'
// eslint-disable-next-line import/no-unresolved
import routes from '~pages'
import { user } from '@/composables/useAuth'

const isDevelopment = process.env.NODE_ENV !== 'production'

const router = createRouter({
  routes,
  history: createWebHistory(),
})

const isAuthPassed = ({ to: { matched = [] }, from }) => {
  let val = !matched.some(
    ({ meta: { requiredAuth = false } }) => requiredAuth && !user.value.isLoggedIn
  )
  if (!val && from.name !== 'auth') router.push({ name: 'auth' })
  return val
}

const isNoAuthPassed = ({ to: { matched = [] } }) => {
  let val = !matched.some(
    ({ meta: { requiredNoAuth = false } }) => requiredNoAuth && user.value.isLoggedIn
  )
  if (!val) router.push({ path: '/' })
  return val
}

const isRolesPassed = ({ to: { matched = [] } }) => {
  const orArray = v => (Array.isArray(v) ? v : [v])
  let val = !matched.some(
    ({ meta: { requiredRole = undefined } }) =>
      requiredRole && !orArray(requiredRole).includes(user.value?.data?.user?.role)
  )
  if (!val) router.push({ path: '/' })
  return val
}

const isDevelopmentCheckPassed = ({ to: { matched = [] } }) =>
  !matched.some(({ meta: { devOnly = false } }) => devOnly && !isDevelopment)

router.beforeEach((to, from, next) => {
  if (
    isAuthPassed({ to, from }) &&
    isNoAuthPassed({ to, from }) &&
    isRolesPassed({ to, from }) &&
    isDevelopmentCheckPassed({ to })
  ) {
    return next()
  }
})

router.afterEach(to => {
  let titleV = ''
  to.matched.forEach(({ meta: { title } }) => {
    if (title) {
      titleV = title
    }
  })
  document.title = titleV
})

export default router
