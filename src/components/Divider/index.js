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
  modifiers?: Array<Modifiers>
}
export default function Divider({
  className,
  blank,
  thin,
  modifiers = []
}: Props) {
  return (
    <hr
      className={cx(
        'Divider',
        className,
        { 
          'Divider--blank': blank, 
          'Divider--thin': thin 
        },
        modifiers.map(mod => 'Divider--' + mod)
      )}
    />
  )
}
