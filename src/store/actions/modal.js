export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export const openModal = ({ title, content, ...props }) => ({
  type: OPEN_MODAL,
  title,
  content,
  ...props
})

export const closeModal = () => ({
  type: CLOSE_MODAL
})
