// @flow
import React from 'react'
import * as iconset from 'ui/assets/icons'
import classNames from 'classnames/bind'
import styles from './index.css'
const cx = classNames.bind(styles)

export type Props = {
  type?: string,
  className?: string,
  modifiers?: Array<string>
}

export default function Icon({ type, className }: Props) {
  return (
    <span className={cx('Icon', className)}>
      <span
        className={cx('Icon-wrapper')}
        dangerouslySetInnerHTML={{ __html: iconset[type] }}
      />
    </span>
  )
}
