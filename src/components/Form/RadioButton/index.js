// @flow
import React from 'react'
import classNames from 'classnames/bind'
import { Radio } from 'ui/components/Form'
import Button from 'ui/components/Button'
import Icon from 'ui/components/Icon'
import State from 'ui/helpers/State'

import styles from './index.css'
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
  hiddenInput,
  disabled,
  ...buttonProps
}: Props) {
  return (
    <State>
      {({ isChecked = checked, setState }) => (
        <Button
          noPadding
          fill
          {...buttonProps}
          disabled={disabled}
          className={cx('RadioButton', className)}
          tag={'div'}
        >
          <Radio
            className={cx('RadioButton-radio')}
            {...{ name, value, id, checked: isChecked, disabled }}
            onChange={(e, state) => {
              if (state !== checked) {
                setState({ checked: state })
              }
              if (onChange) {
                onChange(e, state)
              }
            }}
            label={{
              className: 'RadioButton-label',
              fill: true,
              content: (
                <div className="flex-row flex-spread flex-middle">
                  <span className={cx('RadioButton-text')}>{label}</span>
                  <Icon type={'check'} className={cx('RadioButton-icon')} />
                </div>
              )
            }}
          />
        </Button>
      )}
    </State>
  )
}
