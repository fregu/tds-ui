export const SET_SCREEN = 'SET_SCREEN'

export const setScreen = (breakpoints) => ({
  type: SET_SCREEN,
  ...breakpoints
})
