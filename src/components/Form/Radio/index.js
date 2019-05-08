// @flow
import React from 'react'
import classNames from 'classnames/bind'
import Label from '../Label'
import styles from './index.css'
const cx = classNames.bind(styles)

type Props = {
  id: string,
  name?: string,
  value?: string,
  label: string,
  attributes?: any,
  disabled?: boolean,
  required?: boolean,
  defaultChecked?: boolean,
  checked?: boolean,
  className?: string,
  modifiers?: Array<string>
}

export default function Radio({
  id,
  name,
  value,
  attributes = {},
  required,
  disabled,
  label,
  className,
  checked,
  defaultChecked,
  modifiers = []
}: Props) {
  return (
    <div
      className={cx('Radio', className, modifiers.map(mod => 'Radio--' + mod))}
    >
      <input
        id={id}
        type="radio"
        className={cx('Radio-input')}
        value={value}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        required={required}
      />
      <Label className={cx('Radio-label')} htmlFor={id} text={label} />
    </div>
  )
}
