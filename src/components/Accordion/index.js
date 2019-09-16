// @flow
import React, { Component } from 'react'
import classNames from 'classnames/bind'
import Title from 'ui/components/Title'
import Icon from 'ui/components/Icon'
import styles from './index.css'
const cx = classNames.bind(styles)

type Props = {
  title: string,
  children: any,
  className?: string,
  fill?: boolean,
  noPadding?: boolean,
  theme?: string,
  isOpen?: boolean
}
type State = {
  isOpen?: boolean,
  height?: number | null,
  hover?: boolean
}

export default class Accordion extends Component<Props, State> {
  content: HTMLElement
  wrapper: HTMLElement
  preventTransition: boolean
  state = { isOpen: this.props.isOpen }
  resizing: boolean = false
  componentDidMount = () => {
    this.wrapper.addEventListener('transitionend', this.onTransitionEnd)
  }
  componentWillUnmount = () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize)
    }
  }
  onClick = () => {
    if (this.state.isOpen) {
      this.onClose()
    } else {
      this.onOpen()
    }
  }
  onResize = () => {
    if (this.resizing || !this.state.isOpen) {
      return false
    }
    this.resizing = true
    requestAnimationFrame(this.setHeight)
  }
  onOpen = () => {
    this.setState({
      isOpen: true
    })
    if (typeof window !== 'undefined') {
      this.setHeight()
      window.addEventListener('resize', this.onResize)
    }
  }
  onClose = () => {
    this.setHeight()
    setTimeout(() => {
      this.setState({
        isOpen: false
      })
    }, 0)
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize)
    }
  }
  onMouseOver = () => {
    this.setState({ hover: true })
  }
  onMouseOut = () => {
    this.setState({ hover: false })
  }
  setHeight = (callback?: Function = () => {}) => {
    this.setState(
      {
        height: this.content.clientHeight
      },
      () => {
        if (typeof callback === 'function') {
          callback()
        }
        this.resizing = false
      }
    )
  }
  onTransitionEnd = () => {
    this.setState({
      height: null
    })
  }
  render() {
    const { title, className, children, fill, noPadding, theme } = this.props
    const { isOpen, height, hover } = this.state
    return (
      <section
        className={cx(
          'Accordion',
          {
            'Accordion--open': isOpen,
            'Accordion--hover': hover,
            'Accordion--closed': !isOpen,
            'Accordion--fill': fill,
            'Accordion--noPadding': noPadding,
            'Accordion--themed': theme,
            [`theme-${theme}`]: theme
          },
          className
        )}
      >
        <header
          className={cx('Accordion-header')}
          onClick={this.onClick}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          <Title
            className={cx('Accordion-title')}
            level={2}
            asLevel={5}
            text={title}
          />
          <Icon
            size="big"
            type={isOpen ? 'minus' : 'plus'}
            className={cx('Accordion-headerIcon')}
          />
        </header>
        <div
          ref={el => el && (this.wrapper = el)}
          className={cx('Accordion-contentWrapper')}
          style={height ? { height: `${String(height)}px` } : null}
        >
          <div
            ref={el => el && (this.content = el)}
            className={cx('Accordion-content')}
            aria-hidden={!isOpen}
          >
            {children}
          </div>
        </div>
      </section>
    )
  }
}
