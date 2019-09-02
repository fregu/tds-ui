// @flow
import React, { Fragment, Component } from 'react'
import classNames from 'classnames/bind'
import Title from 'ui/components/Title'
import Button from 'ui/components/Button'
import Connect from 'ui/helpers/Connect'
import Figure, { Props as FigureProps } from 'ui/components/Figure'
import Carousel from 'ui/components/Carousel'
import { closeModal } from 'ui/store/actions/modal'
import { useDispatch } from 'react-redux'
import { strings } from 'ui/lang'
import styles from './index.css'
const cx = classNames.bind(styles)

type Props = {
  className?: string,
  title?: string,
  images?: Array<FigureProps>,
  content?: any,
  children?: any,
  onClose?: Function,
  persistent?: boolean,
  size?: 'small' | 'medium' | 'large',
  modifiers?: Array<string>
}

export default class Modal extends Component<Props> {
  box: HTMLElement

  componentDidMount = () => {
    this.setFocus()
  }

  setFocus = () => {
    this.box.focus()
  }
  render() {
    const {
      className,
      title,
      images,
      content,
      children,
      onClose,
      persistent,
      size,
      modifiers = []
    } = this.props
    let keyEventListener
    return (
      <Connect mapDispatchToProps={{ closeModal }}>
        {({ closeModal: dispatchCloseModal }) => {
          const closeModal = () => {
            if (persistent) {
              return false
            }
            if (onClose) {
              onClose()
            }
            dispatchCloseModal()
          }
          // close on Escape
          if (!keyEventListener && typeof window !== 'undefined') {
            keyEventListener = window.addEventListener(
              'keydown',
              ({ code }) => {
                if (code === 'Escape') {
                  closeModal()
                }
              }
            )
          }

          return (
            <Fragment>
              <div
                className={cx('Modalbox-overlay')}
                onClick={this.closeModal}
                tabIndex="0"
                role="button"
              />
              <span onFocus={this.setFocus} />
              <section
                className={cx(
                  'Modalbox',
                  {
                    'Modalbox--withTitle': title,
                    [`Modalbox--${size}`]: size
                  },
                  className,
                  modifiers.map(mod => 'Modalbox--' + mod)
                )}
                ref={el => el && (this.box = el)}
              >
                {title ? (
                  <header className={cx('Modalbox-header')}>
                    <Title
                      className={cx('Modalbox-title')}
                      level={2}
                      asLevel={4}
                    >
                      {title}
                    </Title>
                  </header>
                ) : null}
                {!persistent ? (
                  <Button
                    plain={!images}
                    round
                    hiddenText
                    className={cx('Modalbox-closebutton')}
                    onClick={closeModal}
                    size="large"
                    icon={{ type: 'close' }}
                    text={strings.general.close}
                  />
                ) : null}

                {images ? (
                  <Carousel
                    controls
                    className={cx('Modalbox-images')}
                    items={images.map(image => ({ image }))}
                    activeIndex={images.reduce(
                      (selectedIndex, image, index) =>
                        (!selectedIndex && image.selected && index) ||
                        selectedIndex,
                      0
                    )}
                  />
                ) : null}
                {content || children ? (
                  <div className={cx('Modalbox-content')}>
                    {content || children}
                  </div>
                ) : null}
              </section>
              <span onFocus={this.setFocus} />
            </Fragment>
          )
        }}
      </Connect>
    )
  }
}
