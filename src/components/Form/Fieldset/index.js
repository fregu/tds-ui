// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import styles from './index.css'
const cx = classNames.bind(styles)

export type Props = {
  className?: string,
  children?: Node,
  label?: string,
  legend?: string
}
export default function Fieldset({
  className,
  children,
  label,
  legend
}: Props) {
  return (
    <fieldset className={cx('Fieldset', className)}>
      {label || legend ? (
        <legend
          className={cx(
            'Fieldset-legend',
            'Label-text',
            'text-weight-bold ui-text-label'
          )}
        >
          {label || legend}
        </legend>
      ) : null}
      {children}
    </fieldset>
  )
}
