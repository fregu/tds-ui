export const REDIRECT_TO = 'REDIRECT_TO'
export const NAVIGATION = 'NAVIGATION'

export const redirectTo = to => ({
  type: REDIRECT_TO,
  to
})
export const setUrl = url => ({
  type: NAVIGATION,
  url
})
