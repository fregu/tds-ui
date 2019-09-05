export const offline = ({ dispatch, getState }) => next => action => {
  next(action)

  const updateOnlineStatus = () =>
    dispatch({ type: navigator.onLine ? 'IS_ONLINE' : 'IS_OFFLINE' })

  if (typeof window !== undefined && action.type === 'INIT_APP') {
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
  }
}
