// @flow
import React from 'react'
import cx from 'classnames/bind'
import List from 'ui/components/List'
import Checkbox from '../Checkbox'

type CheckBoxItemProps = {
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
  defaultValue?: Array<string>,
  name?: string,
  options: Array<CheckBoxItemProps>,
  disabled?: boolean,
  /** TODO: handle required and valitidy as a group */
  required?: boolean
}

export default function CheckboxList({
  id: listId,
  name,
  label,
  defaultValue = [],
  className,
  options = [],
  modifiers = [],
  disabled: listDisabled,
  required: listRequired
}: Props) {
  return (
    <fieldset
      className={cx(
        'CheckboxList',
        className,

        modifiers.map(mod => 'CheckboxList--' + mod)
      )}
    >
      {label ? (
        <legend className={cx('ui-text-weight-bold ui-text-label')}>
          {label}
        </legend>
      ) : null}
      <List
        className={cx('CheckboxList-list')}
        items={options.map(
          (
            { id, value, text, disabled, required, defaultChecked, ...props },
            index
          ) => (
            <Checkbox
              key={value}
              id={id || `${listId}-${index}`}
              name={name ? name + '[]' : ''}
              value={value}
              label={text}
              defaultChecked={defaultValue.includes(value) || defaultChecked}
              disabled={disabled || listDisabled}
              required={required}
            />
          )
        )}
      />
    </fieldset>
  )
}
