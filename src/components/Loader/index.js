// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import styles from './index.css'
const cx = classNames.bind(styles)

export type Props = {
  className?: string,
  type?: 'spinner',
  children?: Node,
  size?: 'small' | 'large'
}

export default function Loader({
  className,
  type = 'spinner',
  children,
  size
}: Props) {
  return (
    <div
      className={cx('Loader', className, {
        [`Loader--${type}`]: type,
        [`Loader--${size}`]: size
      })}
    >
      <div className={cx('Loader-wrapper')}>
        {Array(10)
          .fill(undefined)
          .map((__, index) => (
            <span key={index} className={'Loader-dotWrapper'}>
              <span className={cx('Loader-dot')} />
            </span>
          ))}
      </div>
      <div className={cx('Loader-content')}>{children}</div>
    </div>
  )
}
