import { createRouter, createWebHistory } from 'vue-router'
// eslint-disable-next-line import/no-unresolved
import routes from '~pages'
import { hasRole } from '@/composables/useAuth'

const isDevelopment = process.env.NODE_ENV !== 'production'

const router = createRouter({
  routes,
  history: createWebHistory(),
})

const isRolesPassed = ({ to: { matched = [] } }) => {
  const orArray = v => (Array.isArray(v) ? v : [v])
  let val = !matched.some(
    ({ meta: { requiredRole = undefined } }) =>
      requiredRole && !orArray(requiredRole).some(hasRole)
  )
  if (!val) router.push({ path: '/' })
  return val
}

const isDevelopmentCheckPassed = ({ to: { matched = [] } }) =>
  !matched.some(({ meta: { devOnly = false } }) => devOnly && !isDevelopment)

router.beforeEach((to, from, next) => {
  if (
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
