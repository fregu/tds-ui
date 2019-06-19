// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import Label, { type Props as LabelProps } from '../Label'
import styles from './index.css'
const cx = classNames.bind(styles)

type Props = {
  id: string,
  name?: string,
  value?: string,
  label: string | LabelProps,
  attributes?: any,
  disabled?: boolean,
  required?: boolean,
  defaultChecked?: boolean,
  children?: Node,
  checked?: boolean,
  className?: string,
  modifiers?: Array<string>
}

export default function Radio({
  id,
  name,
  value,
  required,
  disabled,
  label,
  children,
  className,
  onChange,
  checked,
  defaultChecked,
  modifiers = [],
  ...attributes
}: Props) {
  return (
    <div
      className={cx(
        'Radio',
        className,
        {
          'Radio--disabled': disabled
        },
        modifiers.map(mod => 'Radio--' + mod)
      )}
    >
      <input
        id={id}
        type="radio"
        {...attributes}
        className={cx('Radio-input')}
        value={value}
        name={name}
        onChange={e =>
          typeof onChange === 'function' ? onChange(e, e.target.checked) : {}
        }
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        required={required}
      />
      <Label
        htmlFor={id}
        text={typeof label === 'string' ? label : null}
        disabled={disabled}
        {...(typeof label !== 'string' ? label : {})}
        className={cx('Radio-label', label.className)}
      >
        {children}
      </Label>
    </div>
  )
}
