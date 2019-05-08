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

export default function FormCheckbox({
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
      className={cx(
        'FormCheckbox',
        className,
        {
          'FormCheckbox--disabled': disabled
        },
        modifiers.map(mod => 'FormCheckbox--' + mod)
      )}
    >
      <input
        id={id}
        type="checkbox"
        className={cx('FormCheckbox-input')}
        value={value}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        required={required}
      />
      <Label
        className={cx('FormCheckbox-label')}
        htmlFor={id}
        text={label}
        icon={{ type: 'check', className: cx('FormCheckbox-checkIcon') }}
        optionalLabel={false}
      />
    </div>
  )
}
