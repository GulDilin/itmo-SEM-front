import { ref } from 'vue'

export const confirmationDialogs = ref([])
let id = 1

export const addDialog = item => {
  let itemToAdd = { props: item, id, ref: ref() }
  const setItemRef = el => (itemToAdd.ref.value = el)
  itemToAdd.setItemRef = setItemRef

  id++
  confirmationDialogs.value.push(itemToAdd)
  return itemToAdd
}

export const removeDialogById = id => confirmationDialogs.value?.removeBy({ id })

export const invokeDialogById = id => confirmationDialogs.value.findBy({ id }).ref.open()

export const confirmAction = item =>
  new Promise(resolve => {
    const dialog = ref()
    const onFinish = v => {
      removeDialogById(dialog.value?.id)
      resolve(v)
    }
    item.onConfirm = () => onFinish(true)
    item.onCancel = () => onFinish(false)
    dialog.value = addDialog(item)
    console.log({ dialog: dialog.value })
    setTimeout(() => dialog.value?.ref?.open(), 300)
  })
