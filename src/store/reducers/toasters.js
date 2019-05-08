import { SHOW_TOASTER, HIDE_TOASTER } from '../actions/toasters'

export function toasters(state = [], { type, ...data }) {
  switch (type) {
    case SHOW_TOASTER:
      return [...(state || []), { ...data }]
    case HIDE_TOASTER:
      return data.id ? state.filter(toast => toast.id !== data.id) : []
    default:
      return state
  }
}
