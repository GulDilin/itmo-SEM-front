import { computed, ref } from 'vue'
import config from '@/config'

const { SM, MD, LG, XL, XXL } = config.display

const w = ref(window.innerWidth)
const h = ref(window.innerHeight)
const size = computed(() => ({ width: w.value, height: h.value }))
const xs = computed(() => w.value < SM)
const sm = computed(() => w.value >= SM && w.value < MD)
const md = computed(() => w.value >= MD && w.value < LG)
const lg = computed(() => w.value >= LG && w.value < XL)
const xl = computed(() => w.value >= XL && w.value < XXL)
const xxl = computed(() => w.value >= XXL)

const smAndUp = computed(() => w.value >= SM)
const mdAndUp = computed(() => w.value >= MD)
const lgAndUp = computed(() => w.value >= LG)
const xlAndUp = computed(() => w.value >= XL)

const smAndDown = computed(() => w.value < MD)
const mdAndDown = computed(() => w.value < LG)
const lgAndDown = computed(() => w.value < XL)
const xlAndDown = computed(() => w.value < XXL)

window.addEventListener('resize', () => {
  w.value = window.innerWidth
  h.value = window.innerHeight
})

export {
  w,
  h,
  size,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  smAndUp,
  mdAndUp,
  lgAndUp,
  xlAndUp,
  smAndDown,
  mdAndDown,
  lgAndDown,
  xlAndDown,
}
