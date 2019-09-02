// @flow
import React, { Component, type Node } from 'react'
import classNames from 'classnames/bind'
import Figure, { type Props as FigureProps } from 'ui/components/Figure'
import Button from 'ui/components/Button'
import scrollTo, { scrollToEl } from 'ui/helpers/scrollTo'
import styles from './index.css'
const cx = classNames.bind(styles)

export type ItemProps = {
  image?: FigureProps,
  content?: Node
}
export type Props = {
  items: Array<ItemProps>,
  className?: string,
  activeIndex?: number,
  controls?: boolean
}
type State = {
  activeIndex: number
}
let touching
let scrollingTimeout
let isAnimating
let isReversedDirection

export default class Carousel extends Component<Props, State> {
  el: HTMLElement
  wrapper: HTMLElement
  items: HTMLElement
  state = {
    activeIndex: this.props.activeIndex || 0
  }
  stepLeft = () => {
    const { activeIndex } = this.state
    const newIndex = activeIndex > 0 ? activeIndex - 1 : 0

    this.scrollToItem(newIndex)
    this.setState({
      activeIndex: newIndex
    })
  }
  stepRight = () => {
    const { activeIndex } = this.state
    const { items } = this.props
    const newIndex =
      activeIndex < items.length - 1 ? activeIndex + 1 : items.length - 1

    this.scrollToItem(newIndex)
    this.setState({
      activeIndex: newIndex
    })
  }
  onResize = () => {
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => this.scrollToItem(this.state.activeIndex, 0))
    }
  }
  onScroll = () => {
    const { activeIndex } = this.state
    clearTimeout(scrollingTimeout)
    if (!isAnimating && !touching) {
      scrollingTimeout = setTimeout(() => this.scrollStop(true), 50)
    }

    const wrapperWidth = this.wrapper.clientWidth
    const childEls = this.items.children
    const scrollLeft = this.wrapper.scrollLeft

    // calculate which item is closest to current scrolling position
    const currentIndex = Array.prototype.reduce.call(
      childEls,
      (closestIndex, el, index) => {
        const scrollPos = isReversedDirection
          ? scrollLeft + wrapperWidth
          : scrollLeft
        const elPos = isReversedDirection
          ? el.offsetLeft + el.clientWidth
          : el.offsetLeft

        const closestPos = isReversedDirection
          ? childEls[closestIndex].offsetLeft +
            childEls[closestIndex].clientWidth
          : childEls[closestIndex].offsetLeft

        return Math.abs(scrollPos - elPos) < Math.abs(scrollPos - closestPos)
          ? index
          : closestIndex
      },
      0
    )

    if (activeIndex !== currentIndex) {
      this.setState({ activeIndex: currentIndex })
    }
  }
  scrollStop = (snapToActive?: boolean) => {
    clearTimeout(scrollingTimeout)
    const { activeIndex } = this.state

    // Do not snap to closes if carousel is scrolled to the end of start

    if (
      this.props.multiple &&
      this.wrapper.scrollLeft >=
        this.items.clientWidth - this.wrapper.clientWidth
    ) {
      isReversedDirection = true
      this.setState({ activeIndex: this.items.children.length - 1 })
    } else if (this.props.multiple && this.wrapper.scrollLeft <= 0) {
      isReversedDirection = false
      this.setState({ activeIndex: 0 })
    } else if (snapToActive) {
      this.scrollToItem(activeIndex, 250).then(() => {
        isAnimating = false
      })
    } else {
      isAnimating = false
    }
  }
  scrollTo = (leftPos, duration = 0) => {
    return new Promise(resolve =>
      scrollTo(this.wrapper, leftPos, duration, 'scrollLeft', resolve)
    )
  }
  scrollToItem = (index: number, duration: number = 500) => {
    const wrapperWidth = this.wrapper.clientWidth
    clearTimeout(scrollingTimeout)
    isAnimating = duration > 0

    const leftPos = isReversedDirection
      ? this.items.children[index].offsetLeft +
        this.items.children[index].clientWidth -
        this.wrapper.clientWidth
      : this.items.children[index].offsetLeft

    return this.scrollTo(leftPos, duration).then(() => {
      isAnimating = false
    })
  }
  onMouseDown = e => {
    touching = {
      start: e.pageX,
      scroll: this.wrapper.scrollLeft
    }
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseleave', this.onMouseUp)
    document.addEventListener('mouseup', this.onMouseUp)
  }
  onMouseMove = e => {
    if (touching && e.pageX) {
      this.scrollTo(touching.scroll + touching.start - e.pageX)
    }
  }
  onMouseUp = e => {
    touching = false
    this.scrollStop(true)
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseleave', this.onMouseUp)
    document.removeEventListener('mouseup', this.onMouseUp)
  }
  onKeyPress = e => {
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => {
        switch (e.code) {
          case 'ArrowLeft':
            this.stepLeft()
            break
          case 'ArrowRight':
            this.stepRight()
            break
        }
      })
    }
  }
  bindInitEvents = () => {
    this.wrapper.addEventListener('scroll', this.onScroll)
    this.wrapper.addEventListener('mousedown', this.onMouseDown)
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', this.onKeyPress)
      window.addEventListener('resize', this.onResize)
    }
  }
  unBindInitEvents = () => {
    this.wrapper.removeEventListener('scroll', this.onScroll)
    this.wrapper.removeEventListener('mousedown', this.mouseDown)
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseleave', this.onMouseUp)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('keydown', this.onKeyPress)
  }
  componentDidMount = () => {
    if (this.props.activeIndex) {
      setTimeout(
        () =>
          this.scrollToItem(this.props.activeIndex, 0).then(() =>
            this.bindInitEvents()
          ),
        0
      )
    } else {
      this.bindInitEvents()
    }
  }
  componentWillUnmount = () => {
    this.unBindInitEvents()
  }

  render() {
    const { items = [], className, multiple, controls } = this.props
    const { activeIndex } = this.state
    return (
      <div
        ref={el => el && (this.el = el)}
        className={cx('Carousel', className, {
          'Carousel--multiple': multiple
        })}
      >
        {controls ? (
          <div className={cx('Carousel-actions')}>
            {activeIndex > 0 ? (
              <Button
                size="large"
                hiddenText
                round
                className={cx('Carousel-stepLeft')}
                icon={{ type: 'chevronLeft' }}
                onClick={this.stepLeft}
                text="left"
              />
            ) : null}
            {activeIndex < items.length - 1 ? (
              <Button
                size="large"
                round
                iconAfter
                hiddenText
                className={cx('Carousel-stepRight')}
                icon={{ type: 'chevronRight' }}
                onClick={this.stepRight}
                text="right"
              />
            ) : null}
          </div>
        ) : null}
        <div
          ref={el => el && (this.wrapper = el)}
          className={cx('Carousel-wrapper')}
        >
          <div className={cx('Carousel-innerWrapper')}>
            <div
              ref={el => el && (this.items = el)}
              className={cx('Carousel-items')}
            >
              {items.map(({ id, image, content, isActive }, index) => (
                <div
                  key={`carouselitem-${id || index}`}
                  className={cx('Carousel-item', {
                    'Carousel-item--image': image
                  })}
                >
                  {image ? (
                    <Figure
                      {...image}
                      className={cx('Carousel-image', image.className)}
                    />
                  ) : null}
                  {content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
