export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export const openModal = ({ title, content, size, images, ...props }) => ({
  type: OPEN_MODAL,
  images,
  size: size || (images.length && 'large') || null,
  title,
  content,
  ...props
})

export const closeModal = () => ({
  type: CLOSE_MODAL
})
