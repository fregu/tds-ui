// @flow
import React, { Fragment, useEffect, useRef } from 'react'
import classNames from 'classnames/bind'
import Title from 'ui/components/Title'
import Button from 'ui/components/Button'
import Connect from 'ui/helpers/Connect'
import Figure, { Props as FigureProps } from 'ui/components/Figure'
import Carousel from 'ui/components/Carousel'
import { closeModal as closeModalAction } from 'ui/store/actions/modal'
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
  size?: 'small' | 'medium' | 'large' | 'full',
  modifiers?: Array<string>
}

export default function Modal({
  className,
  title,
  images,
  content,
  children,
  onClose,
  persistent,
  size,
  modifiers = []
}: Props) {
  const el = useRef()
  const dispatch = useDispatch()
  const keyEventListener = ({ code }) => {
    if (code === 'Escape') {
      closeModal()
    }
  }
  const setFocus = () => {
    if (el.current) {
      el.current.focus()
    }
  }
  useEffect(() => {
    setFocus()
    window.addEventListener('keydown', keyEventListener)
    return () => {
      window.removeEventListener('keydown', keyEventListener)
    }
  }, [el])

  const closeModal = () => {
    if (persistent) {
      return false
    }
    if (onClose) {
      onClose()
    }
    dispatch(closeModalAction())
  }

  return (
    <Fragment>
      <div
        className={cx('Modalbox-overlay')}
        onClick={closeModal}
        tabIndex="0"
        role="button"
      />
      <span onFocus={setFocus} />
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
        ref={el}
      >
        {title ? (
          <header className={cx('Modalbox-header')}>
            <Title className={cx('Modalbox-title')} level={2} asLevel={4}>
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
                (!selectedIndex && image.selected && index) || selectedIndex,
              0
            )}
          />
        ) : null}
        {content || children ? (
          <div className={cx('Modalbox-content')}>{content || children}</div>
        ) : null}
      </section>
      <span onFocus={setFocus} />
    </Fragment>
  )
}
