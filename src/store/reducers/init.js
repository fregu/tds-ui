import { INIT_APP } from '../actions/init'

export function init(state = false, { type }) {
  switch (type) {
    case INIT_APP:
      return true
    default:
      return state
  }
}
