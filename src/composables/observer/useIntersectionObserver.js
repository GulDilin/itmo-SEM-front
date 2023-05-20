import useObserver from './useObserver'

/*
 * To make observer be enabled, pass root to observed component ref
 * isEnabled is optional boolean
 */
export default function useIntersectionObserver(
  onObserved = () => {},
  root = undefined,
  options = undefined
) {
  return useObserver(
    IntersectionObserver,
    entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) onObserved(entry)
      })
    },
    { ...options, root }
  )
}
