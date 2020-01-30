// @flow
import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.css'
const cx = classNames.bind(styles)
type Modifiers = 'blank' | 'thin'
type Props = {
  className?: string,
  blank?: boolean,
  thin?: boolean,
  /** 'blank' | 'thin' */
  text?: string,
  modifiers?: Array<Modifiers>
}
export default function Divider({
  className,
  blank,
  thin,
  text,
  modifiers = []
}: Props) {
  return (
    <div
      data-text={text}
      className={cx(
        'Divider',
        className,
        {
          'Divider--blank': blank,
          'Divider--thin': thin
        },
        modifiers.map(mod => 'Divider--' + mod)
      )}
    >
      <hr className={cx('Divider-line')} />
      {text ? <span className={cx('Divider-text')}>{text}</span> : null}
      {text ? <hr className={cx('Divider-line')} /> : null}
    </div>
  )
}
