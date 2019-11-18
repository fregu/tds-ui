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
  modifiers?: Array<string>,
  toggle?: boolean
}

export default function Checkbox({
  id,
  name,
  value = true,
  required,
  disabled,
  label,
  className,
  checked,
  defaultChecked,
  modifiers = [],
  onChange,
  toggle,
  ...attributes
}: Props) {
  return (
    <div
      className={cx(
        'FormCheckbox',
        className,
        {
          'FormCheckbox--disabled': disabled,
          'FormCheckbox--toggle': toggle
        },
        modifiers.map(mod => 'FormCheckbox--' + mod)
      )}
    >
      <input
        id={id}
        type="checkbox"
        {...attributes}
        className={cx('FormCheckbox-input')}
        onChange={e =>
          typeof onChange === 'function' ? onChange(e, e.target.checked) : null
        }
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
