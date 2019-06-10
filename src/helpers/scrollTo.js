/* eslint-disable */
function easeInOutQuad(t, b, c, d) {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}
/* eslint-enable */

export default function scrollTo(
  el,
  destination,
  duration = 500,
  prop = 'scrollTop',
  callback = () => {}
) {
  const start = el[prop]
  const change = destination - start
  const increment = 20
  let stop = false
  let timeout
  let currentTime = 0

  function animateScroll() {
    if (stop) {
      clearTimeout(timeout)
      return false
    }

    let val
    currentTime += increment

    val = easeInOutQuad(currentTime, start, change, duration)

    el[prop] = val

    if (currentTime <= duration) {
      timeout = setTimeout(animateScroll, increment)
    } else {
      if (typeof callback === 'function') {
        clearTimeout(timeout)
        callback()
      }
    }
  }
  if (duration > 0) {
    animateScroll()
  } else {
    el[prop] = destination
    callback()
  }
  return {
    stop() {
      stop = true
      el[prop] = destination
      clearTimeout(timeout)
      callback()
    }
  }
}
function getLastScrollableContainer() {
  let parent = window.document.body
  let el = window.document.body.firstElementChild
  while (el.clientHeight <= parent.clientHeight) {
    parent = el
    el = el.firstElementChild
  }
  return el.clientHeight > parent.clientHeight && parent
}

function getScrollElement() {
  const elements = [window.document.documentElement, window.document.body]
  const scrollEL = elements.filter(function(el) {
    el.scrollTop = el.scrollTop + 10

    const isScrolled = el.scrollTop > 0

    if (isScrolled) {
      el.scrollTop = el.scrollTop - 10
    }
    return isScrolled
  })
  return scrollEL.length
    ? scrollEL[0]
    : getLastScrollableContainer() || window.document.documentElement
}

export function scrollToEl(el, duration, callback) {
  var scrollEl = getScrollElement()
  if (typeof el === 'string') {
    el = document.querySelector(el)
  }
  var position = scrollEl.scrollTop + el.getBoundingClientRect().top
  scrollTo(scrollEl, position, duration, 'scrollTop', () => callback(el))
}
