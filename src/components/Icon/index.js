// @flow

import React from 'react'
import * as iconset from 'ui/assets/icons'
import classNames from 'classnames/bind'
import styles from './index.css'
const cx = classNames.bind(styles)

export type Props = {
  type?: string,
  size?: 'small' | 'normal' | 'large' | 'huge',
  className?: string,
  theme?: string
}

export default function Icon({ type, size, className, theme }: Props) {
  return iconset[type] ? (
    <span
      className={cx('Icon', className, {
        [`Icon--themed theme-${theme || ''}`]: theme,
        ['Icon--' + (size || '')]: size
      })}
    >
      <span
        className="Icon-wrapper"
        dangerouslySetInnerHTML={{ __html: iconset[type] }}
      />
    </span>
  ) : null
}
