// only if visible <div v-click-outside="onClickOutside">
// always <div v-click-outside.always="onClickOutside">
export default {
  mounted(el, binding) {
    el.clickOutsideEvent = event => {
      if (
        !(el === event.target || el.contains(event.target)) &&
        (window.getComputedStyle(el).display !== 'none' || binding.modifiers.always)
      ) {
        binding.value(event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted: el => document.body.removeEventListener('click', el.clickOutsideEvent),
}
