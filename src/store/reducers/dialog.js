import { SHOW_DIALOG, CLOSE_DIALOG } from '../actions/dialog'

export function dialog(state = null, { type, ...data }) {
  switch (type) {
    case SHOW_DIALOG:
      return { ...data }
    case CLOSE_DIALOG:
      return false
    default:
      return state
  }
}
