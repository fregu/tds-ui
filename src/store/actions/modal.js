export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export const openModal = ({ title, content, images, ...props }) => ({
  type: OPEN_MODAL,
  images,
  title,
  content,
  ...props
})

export const closeModal = () => ({
  type: CLOSE_MODAL
})
