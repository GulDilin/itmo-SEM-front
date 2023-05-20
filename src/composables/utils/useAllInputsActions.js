export default function useAllInputsActions(inputs) {
  const validate = () => inputs.map(it => it.value?.validate?.()).every(it => it)

  const clear = () => inputs.forEach(it => it.value?.clear?.())

  return {
    validate,
    clear,
  }
}
