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
  activeIndex?: number
}
type State = {
  activeIndex: number
}
let scrollingTimeout
let isScrolling
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
    this.setState({
      activeIndex: newIndex
    })
    this.scrollToItem(newIndex)
  }
  stepRight = () => {
    const { activeIndex } = this.state
    const { items } = this.props
    const newIndex =
      activeIndex < items.length - 1 ? activeIndex + 1 : items.length - 1

    this.setState({
      activeIndex: newIndex
    })
    this.scrollToItem(newIndex)
  }
  onScroll = () => {
    const { activeIndex } = this.state

    if (!isScrolling) {
      clearTimeout(scrollingTimeout)
      scrollingTimeout = setTimeout(() => this.scrollStop(true), 250)
      const bounds = this.wrapper.getBoundingClientRect()
      const currentIndex = Math.round(this.wrapper.scrollLeft / bounds.width)
      if (activeIndex !== currentIndex) {
        this.setState({ activeIndex: currentIndex })
      }
    }

    //isScrolling = true
  }
  scrollStop = (snapToActive?: boolean) => {
    const { activeIndex } = this.state
    isScrolling = false

    if (snapToActive) {
      this.scrollToItem(activeIndex, 250)
    }
  }
  scrollToItem = (index: number, duration: number = 500) => {
    const bounds = this.wrapper.getBoundingClientRect()
    isScrolling = true
    scrollTo(
      this.wrapper,
      bounds.width * index,
      duration,
      'scrollLeft',
      this.scrollStop
    )
  }
  componentDidMount = () => {
    this.wrapper.addEventListener('scroll', this.onScroll)
  }
  render() {
    const { items = [], className } = this.props
    const { activeIndex } = this.state

    return (
      <div
        ref={el => el && (this.el = el)}
        className={cx('Carousel', className)}
      >
        <div className={cx('Carousel-actions')}>
          {activeIndex > 0 ? (
            <Button
              className={cx('Carousel-stepLeft')}
              icon={{ type: 'chevronLeft' }}
              onClick={this.stepLeft}
              text="left"
            />
          ) : null}
          {activeIndex < items.length - 1 ? (
            <Button
              className={cx('Carousel-stepRight')}
              icon={{ type: 'chevronRight' }}
              onClick={this.stepRight}
              text="right"
            />
          ) : null}
        </div>
        <div
          ref={el => el && (this.wrapper = el)}
          className={cx('Carousel-wrapper')}
        >
          <div
            ref={el => el && (this.items = el)}
            className={cx('Carousel-items')}
          >
            {items.map(({ image, content, isActive }, index) => (
              <div className={cx('Carousel-item')}>
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
    )
  }
}
