const isNumber = v => !isNaN(+v)
const isInteger = v => v?.length === 0 || /^[\d]+$/.test(v)
const isFloat = v => v?.length === 0 || /^[\d]+.[\d]+$/.test(v)
const isColor = v => v?.length === 0 || /^#([0-9a-f]{6}|[0-9a-f]{3})$/i.test(v)

const isUrl = (v, protocol = '') => {
  try {
    const url = new URL(v)
    return !protocol ? true : url.protocol === protocol
  } catch (e) {
    return false
  }
}

export default {
  isNumber,
  isInteger,
  isFloat,
  isColor,
  isUrl,
  rules: {
    isNumber: v => !v || isNumber(v) || 'Необходимо число',
    isRequired: v => !!v || 'Поле является обязательным',
    isInteger: v => !v || isInteger(v) || 'Необходимо целое число',
  },
}
