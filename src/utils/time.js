export const getDuration = ms => {
  ms ??= 0
  if (ms < 1000) return `${ms} ms`
  const intervals = [
    { text: 'hour', v: 3600 * 1000 },
    { text: 'minute', v: 60 * 1000 },
    { text: 'second', v: 1000 },
  ]
  return intervals
    .map(({ v }) => {
      let part = Math.floor(ms / v)
      ms = ms - part * v
      return part
    })
    .map(v => (`${v}`.length < 2 ? `0${v}` : `${v}`))
    .join(':')
}

export const getDurationString = ({ start, end }) => {
  if (start && end) {
    return getDuration(new Date(end) - new Date(start))
  }
  return ''
}

export const getDateTimeString = (date, full) => {
  let timeStr = `${date.toLocaleDateString()} ${date.getHours()}:${('0' + date.getMinutes()).slice(
    -2
  )}`
  if (full) {
    timeStr += `:${('0' + date.getSeconds()).slice(-2)}.${('00' + date.getMilliseconds()).slice(
      -2
    )}`
  }
  return timeStr
}

export const getDateString = date => `${date.toLocaleDateString()}`
export const getTimeString = date => `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`

export const getDiffUpdated = it => Date.now() - new Date(it?.updated_at).getTime()
