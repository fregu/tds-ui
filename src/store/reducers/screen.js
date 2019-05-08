import { SET_SCREEN } from '../actions/screen'

export function screen(state = {}, { type, ...breakpoints }) {
  switch (type) {
    case SET_SCREEN:
      return { ...breakpoints }
    default:
      return state
  }
}
