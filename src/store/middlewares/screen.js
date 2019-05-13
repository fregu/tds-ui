import { setScreen } from '../actions/screen'
import { INIT_APP } from '../actions/init'
let running = false
const breakpoints = {
  minSmall: w => w >= 576,
  minMedium: w => w >= 768,
  minLarge: w => w >= 992,
  minXLarge: w => w >= 1200,
  maxSmall: w => w <= 575,
  maxMedium: w => w <= 767,
  maxLarge: w => w <= 991,
  maxXLarge: w => w <= 1199
}
function resize(dispatch) {
  requestAnimationFrame(() => {
    if (running) {
      return false
    }
    running = true
    requestAnimationFrame(() => {
      const width = window.innerWidth
      const screens = {}
      for (let breakpoint in breakpoints) {
        screens[breakpoint] = breakpoints[breakpoint](width)
      }
      dispatch(setScreen(screens))
      running = false
    })
  })
}

export const screen = ({ dispatch, getState }) => next => action => {
  // if (action.type === INIT_APP) {
  //   if (typeof window !== 'undefined') {
  //     window.addEventListener('resize', () => resize(dispatch))
  //     resize(dispatch)
  //   }
  // }
  next(action)
}
