import { notifySuccess } from '@/composables/useNotifications'

export const download = (data, filename, type) => {
  const file = new Blob([data], { type })
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename)
  } else {
    const a = document.createElement('a')
    const url = URL.createObjectURL(file)
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
  }
}

export const downloadByUrl = (url, filename) => {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.download = filename
  document.body.appendChild(a)
  a.click()
}

export const toBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export const toggleFullscreen = refElement => {
  if (!document.fullscreenElement) {
    const element = refElement._isVue ? refElement.$el : refElement
    element.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

export const redirectExternal = link => {
  const a = document.createElement('a')
  a.href = link
  a.click()
}

export const copyToClipboard = content => {
  const msg = 'Text copied to clipboard'
  if (!navigator.clipboard) {
    // http
    const textArea = document.createElement('textarea')
    textArea.value = content
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    notifySuccess(msg)
  } else {
    // https
    navigator.clipboard.writeText(content).then(() => notifySuccess(msg))
  }
}

export const addScript = src => {
  const script = document.createElement('script')
  script.src = src
  document.head.appendChild(script)
  return script
}

export const getFilenameFromLink = link => link.split('/')?.lastItem?.split('?')[0]

export const openLinkInNewTab = link => window.open(link, '_blank')
