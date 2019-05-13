// @flow
import React from 'react'
import classNames from 'classnames/bind'
import { Radio } from 'ui/components/Form'
import Button from 'ui/components/Button'
import State from 'ui/helpers/State'

const cx = classNames.bind({})

export type Props = {
  className?: string
}

export default function RadioButton({
  name,
  id,
  label,
  value,
  checked,
  defaultChecked,
  onChange,
  className,
  disabled,
  ...buttonProps
}: Props) {
  return (
    <State>
      {({ isChecked = checked, setState }) => (
        <Button
          fill
          {...buttonProps}
          disabled={disabled}
          className={cx('RadioButton', className)}
          onClick={() => {
            setState({ checked: true })
            if (onChange) {
              onChange({}, true)
            }
          }}
        >
          <Radio
            {...{ name, value, id, label, checked: isChecked, disabled }}
            onChange={(e, state) => {
              if (state !== checked) {
                setState({ checked: state })
              }
              if (onChange) {
                onChange(e, state)
              }
            }}
          />
        </Button>
      )}
    </State>
  )
}
