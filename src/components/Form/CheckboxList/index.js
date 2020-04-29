// @flow
import React, { useState } from 'react'
import classnames from 'classnames/bind'
import List from 'ui/components/List'
import Accordion from 'ui/components/Accordion'
import Checkbox from '../Checkbox'
import State from 'ui/helpers/State'
import styles from './index.css'
const cx = classnames.bind(styles)

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
  columns?: { ''?: number, s?: number, m?: number, l?: number, xl?: number },
  options: Array<CheckBoxItemProps>,
  disabled?: boolean,
  /** TODO: handle required and valitidy as a group */
  required?: boolean,
  theme?: string,
  striped?: boolean
}

export default function CheckboxList({
  id: listId,
  name,
  label,
  defaultValue = [],
  className,
  onChange,
  inline,
  options = [],
  modifiers = [],
  disabled: listDisabled,
  required: listRequired,
  theme,
  striped,
  columns
}: Props) {
  const [values, setValues] = useState(defaultValue || [])
  return (
    <fieldset
      className={cx(
        'CheckboxList',
        className,
        { [`CheckboxList--withTheme theme-${theme}`]: theme },
        modifiers.map(mod => 'CheckboxList--' + mod)
      )}
    >
      {label ? (
        <legend className={cx('text-weight-bold ui-text-label')}>
          {label}
        </legend>
      ) : null}
      <List
        horizontal={inline}
        columns={columns}
        className={cx('CheckboxList-list')}
        striped={striped}
        items={options.map(
          (
            {
              id,
              value,
              text,
              disabled,
              required,
              defaultChecked,
              className,
              options,
              columns,
              ...props
            },
            index
          ) => ({
            content: options ? (
              <Accordion
                theme={theme}
                title={`${text} (${options.length})`}
                noMargin
                noPadding
                bordered
              >
                <CheckboxList
                  className={cx('CheckboxList-subList', className)}
                  {...{
                    disabled: listDisabled,
                    name,
                    options,
                    defaultValue,
                    striped,
                    theme,
                    onChange,
                    columns
                  }}
                />
              </Accordion>
            ) : (
              <Checkbox
                className={cx('CheckboxList-checkbox', className)}
                key={value}
                id={id || `${listId || name}-${value || index}`}
                name={name && !name.match(/\[\]$/) ? name + '[]' : name}
                value={value}
                label={text}
                onChange={(e, isChecked) => {
                  const newValues = isChecked
                    ? [...values, value]
                    : values.filter(val => val !== value)

                  if (typeof onChange === 'function') {
                    setValues(newValues)
                    onChange(e, newValues)
                  }
                }}
                defaultChecked={defaultValue.includes(value) || defaultChecked}
                disabled={disabled || listDisabled}
                required={required}
              />
            )
          })
        )}
      />
    </fieldset>
  )
}
