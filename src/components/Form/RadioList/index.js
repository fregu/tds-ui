// @flow
import React from 'react'
import cx from 'classnames/bind'
import List from 'ui/components/List'
import Radio from '../Radio'

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
  defaultValue?: string,
  name?: string,
  options: Array<RadioItemProps>,
  disabled?: boolean,
  /** TODO: handle required and valitidy as a group */
  required?: boolean
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
  required: listRequired
}: Props) {
  return (
    <fieldset
      className={cx(
        'RadioList',
        className,

        modifiers.map(mod => 'RadioList--' + mod)
      )}
    >
      {label ? (
        <legend className={cx('text-weight-bold ui-text-label')}>
          {label}
        </legend>
      ) : null}
      <List
        items={options.map(
          ({ id, value, text, disabled, required, ...props }, index) => (
            <Radio
              key={value}
              id={id || `${listId}-${index}`}
              name={name}
              value={value}
              label={text}
              defaultChecked={defaultValue === value}
              disabled={disabled || listDisabled}
              required={required || listRequired}
            />
          )
        )}
      />
    </fieldset>
  )
}
