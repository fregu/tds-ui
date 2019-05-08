// @flow
import React from 'react'
import classNames from 'classnames/bind'
import Icon from 'ui/components/Icon'
import styles from './index.css'
const cx = classNames.bind(styles)

type Props = {
  className?: string,
  type?: 'default' | 'spinner',
  modifiers?: Array<string>,
  overlay?: boolean,
  fixed?: boolean,
  absolute?: boolean
}

export default function Loader({
  className,
  type = 'default',
  overlay,
  fixed,
  modifiers = []
}: Props) {
  return (
    <div
      className={cx(
        'Loader',
        'Loader--' + type,
        className,
        {
          'Loader--fixed': fixed,
          'Loader--overlay': overlay
        },
        modifiers.map(mod => 'Loader--' + mod)
      )}
    >
      <div className={cx('Loader-wrapper')}>
        <div className={cx('Loader-spinner')}>
          {type === 'spinner' ? (
            Array(30)
              .fill(undefined)
              .map((a, i) => <span key={i} />)
          ) : (
            <Icon className={cx('Loader-icon')} type="loader" size="large" />
          )}
        </div>
      </div>
    </div>
  )
}
