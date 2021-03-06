// @flow
import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.css'
const cx = classNames.bind({})

export type Props = {
  className?: string
}

export default function Hero({
  className,
  children,
  theme,
  dimensions,
  dimension,
  fill,
  background: { url, color, position, size = 'cover', repeat } = {}
}: Props) {
  return (
    <div
      className={cx(
        'Hero',
        {
          'Hero--dimensions': dimensions || dimension,
          'Hero--fill': fill,
          [`dimension-${dimensions}`]: dimension,
          'Hero--theme': theme,
          [`theme-${theme}`]: theme,
          [Object.keys(dimensions || {})
            .map(key => `${key}-dimension-${dimensions[key]}`)
            .join(' ')]: dimensions
        },

        className
      )}
    >
      <div
        className={cx('Hero-background')}
        style={{
          ...(url ? { backgroundImage: `url(${url})` } : {}),
          ...(color ? { backgroundColor: color } : {}),
          ...(position ? { backgroundPosition: position } : {}),
          ...(size ? { backgroundSize: size } : {}),
          ...(repeat ? { backgroundRepeat: repeat } : {})
        }}
      />
      <div className={cx('Hero-content', 'layout-container')}>{children}</div>
    </div>
  )
}
