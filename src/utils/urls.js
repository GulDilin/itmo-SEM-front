// todo: maybe we should use axios implementation (params field of options object)?
export const createFilterQuery = filter => {
  if (!filter) return undefined
  const v = Object.entries(filter)
    .filter(([k, v]) => k && v !== undefined && v !== null)
    .map(([k, v]) =>
      Array.isArray(v)
        ? v.map(item => `${encodeURI(k)}=${encodeURI(item)}`).join('&')
        : `${encodeURI(k)}=${encodeURI(v)}`
    )
    .join('&')
  return v
}

export const createFilterURL = (baseUrl, filter) => {
  if (!filter) return baseUrl
  let filterUrl = createFilterQuery(filter)

  return filterUrl ? `${baseUrl}?${filterUrl}` : baseUrl
}
