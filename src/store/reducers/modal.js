import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal'

export function modal(state = null, { type, ...data }) {
  switch (type) {
    case OPEN_MODAL:
      return { ...data }
    case CLOSE_MODAL:
      return false
    default:
      return state
  }
}
