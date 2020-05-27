// @flow
import React from 'react'
import classnames from 'classnames/bind'
import List from 'ui/components/List'
import Radio from '../Radio'
import styles from './index.css'
const cx = classnames.bind(styles)

type RadioItemProps = {
  id?: string,
  value: string,
  text: string,
  disabled?: boolean,
  required?: boolean
}
type Props = {
  id: string,
  label?: string,
  className?: string,
  modifiers?: Array<string>,
  defaultValue?: string | number,
  name?: string,
  options: Array<RadioItemProps>,
  disabled?: boolean,
  /** TODO: handle required and valitidy as a group */
  required?: boolean,
  theme?: string,
  onChange?: Function,
  striped?: boolean,
  inline?: boolean
}

export default function RadioList({
  id: listId,
  name,
  label,
  defaultValue,
  className,
  options = [],
  modifiers = [],
  disabled: listDisabled,
  required: listRequired,
  theme,
  onChange,
  striped,
  inline
}: Props) {
  return (
    <fieldset
      className={cx(
        'RadioList',
        className,
        { [`RadioList--withTheme theme-${theme}`]: theme },
        modifiers.map(mod => 'RadioList--' + mod)
      )}
    >
      {label ? (
        <legend className={cx('text-weight-bold ui-text-label')}>
          {label}
        </legend>
      ) : null}
      <List
        horizontal={inline}
        striped={striped}
        items={options.map(
          ({ id, value, text, disabled, required, ...props }, index) => ({
            content: (
              <Radio
                key={value}
                id={id || `${listId}-${index}`}
                name={name}
                value={value}
                label={text}
                onChange={(e, isChecked) => {
                  if (isChecked && typeof onChange === 'function') {
                    onChange(e, value)
                  }
                }}
                defaultChecked={defaultValue === value}
                disabled={disabled || listDisabled}
                required={required || listRequired}
                {...props}
              />
            )
          })
        )}
      />
    </fieldset>
  )
}
