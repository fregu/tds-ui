import { REDIRECT_TO, NAVIGATION } from '../actions/navigation'

export default function navigation(state = {}, { type, ...action }) {
  switch (type) {
    case REDIRECT_TO:
      return { ...state, redirect: action.to }
    case NAVIGATION:
      return {
        ...state,
        url: action.url,
        redirect: false
      }
    default:
      return state
  }
}
