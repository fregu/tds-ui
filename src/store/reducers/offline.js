export function offline(state = false, { type, ...data }) {
  switch (type) {
    case 'IS_ONLINE':
      return false
      break
    case 'IS_OFFLINE':
      return true
      break
    default:
      return state
  }
}
