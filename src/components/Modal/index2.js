// @flow
import React, { Fragment, type Node } from 'react'
import Button, { type Props as ButtonProps } from 'ui/components/Button'
import Title, { type Props as TitleProps } from 'ui/components/Title'
import Gutter from 'ui/components/Gutter'
import classNames from 'classnames/bind'
import styles from './index.css'
const cx = classNames.bind(styles)

export type Props = {
  onClose: Function,
  children?: Node,
  content?: Node,
  className?: string,
  actions?: Array<ButtonProps>,
  title?: TitleProps
}

export default function Modal({
  className,
  onClose,
  children,
  content,
  title,
  actions = []
}: Props) {
  const titleObject: Object =
    typeof title === 'string' ? { text: title } : title
  return (
    <Fragment>
      <div
        className={cx('Modal-overlay')}
        onClick={onClose}
        tabIndex="0"
        role="button"
      />
      <section className={cx('Modal')}>
        <header className={cx('Modal-header')}>
          {title ? (
            <Title
              level={2}
              asLevel={3}
              {...titleObject}
              className={cx('Modal-title', titleObject.className)}
            />
          ) : null}
          {onClose ? (
            <Button
              plain
              hiddenText
              className={cx('Modal-closeButton')}
              icon={{ type: 'close' }}
              text="Close"
            />
          ) : null}
        </header>

        <div className={cx('Modal-content')}>{content || children}</div>

        {actions.length ? (
          <footer className={cx('Modal-footer')}>
            <Gutter>
              {actions.map(action => (
                <Button
                  {...action}
                  className={cx('Modal-action', action.className)}
                />
              ))}
            </Gutter>
          </footer>
        ) : null}
      </section>
    </Fragment>
  )
}
