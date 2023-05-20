const isNumber = v => !isNaN(+v)
const isInteger = v => v?.length === 0 || /^[\d]+$/.test(v)
const isFloat = v => v?.length === 0 || /^[\d]+.[\d]+$/.test(v)
const isColor = v => v?.length === 0 || /^#([0-9a-f]{6}|[0-9a-f]{3})$/i.test(v)
const isJson = v => {
  try {
    JSON.parse(v)
    return true
  } catch (err) {
    return false
  }
}
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
    isNumber: v => !v || isNumber(v) || 'Need to be a number',
    isRequired: v => !!v || 'Field is required',
    isInteger: v => !v || isInteger(v) || 'Need to be an integer',
    isFloat: v => !v || isFloat(v) || 'Need to be a float',
    isColor: v => !v || isColor(v) || 'Need to be hex color',
    isJson: v => !v || isJson(v) || 'Need to be json',
    isUrl: v => !v || isUrl(v) || 'Need to be valid URL string',
  },
}
