export const TRACK_EVENT = 'TRACK_EVENT'
export const TRACK_ERROR = 'TRACK_ERROR'
export const TRACK_TIMING = 'TRACK_TIMING'
export const TRACK_PAGE = 'TRACK_PAGE'

export const trackEvent = ({ action, label, category, value }) => ({
  type: TRACK_EVENT,
  action,
  label,
  category,
  value
})
export const trackError = ({ description, fatal }) => ({
  type: TRACK_ERROR,
  description,
  fatal
})
export const trackTiming = ({ name, value, category }) => ({
  type: TRACK_TIMING,
  name,
  value,
  category
})
export const trackPage = ({ title, path, url }) => ({
  type: TRACK_PAGE,
  title,
  path,
  url
})
