import uuid from 'uuid/v1'

export const SHOW_TOASTER = 'SHOW_TOASTER'
export const HIDE_TOASTER = 'HIDE_TOASTER'

export const showToaster = ({ title, content }) => ({
  type: SHOW_TOASTER,
  id: uuid(),
  title,
  content
})

export const hideToaster = id => ({
  type: HIDE_TOASTER,
  id
})
