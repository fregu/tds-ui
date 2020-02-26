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
  icon,
  fill,
  ...buttonProps
}: Props) {
  return (
    <State>
      {({ isChecked = checked, setState }) => (
        <Button
          fill={fill}
          noPadding
          {...buttonProps}
          disabled={disabled}
          className={cx('RadioButton', className)}
          tag={'div'}
        >
          <Radio
            plain={hiddenInput}
            className={cx('RadioButton-radio')}
            {...{
              name,
              value,
              id,
              checked: isChecked,
              disabled,
              defaultChecked
            }}
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
                <div className="flex-row flex-middle">
                  <div className="flex-row flex-middle flex-grow">
                    {icon ? (
                      <Icon
                        {...icon}
                        type={icon.type || icon}
                        className={cx('RadioButton-icon', icon.className)}
                      />
                    ) : null}
                    <span className={cx('RadioButton-text flex-grow')}>
                      {label}
                    </span>
                  </div>
                  <Icon type="check" className={cx('RadioButton-checkIcon')} />
                </div>
              )
            }}
          />
        </Button>
      )}
    </State>
  )
}
