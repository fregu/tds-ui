// @flow
import React from 'react'
import classnames from 'classnames/bind'
import List from 'ui/components/List'
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
  options = [],
  modifiers = [],
  disabled: listDisabled,
  required: listRequired,
  theme,
  striped
}: Props) {
  return (
    <State>
      {({ values = defaultValue || [], setState }) => (
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
                  ...props
                },
                index
              ) => ({
                content: (
                  <Checkbox
                    key={value}
                    id={id || `${listId || name}-${value || index}`}
                    name={name ? name + '[]' : ''}
                    value={value}
                    label={text}
                    onChange={(e, isChecked) => {
                      const newValues = isChecked
                        ? [...values, value]
                        : values.filter(val => val !== value)

                      if (typeof onChange === 'function') {
                        setState({ values: newValues })
                        onChange(e, newValues)
                      }
                    }}
                    defaultChecked={
                      defaultValue.includes(value) || defaultChecked
                    }
                    disabled={disabled || listDisabled}
                    required={required}
                  />
                )
              })
            )}
          />
        </fieldset>
      )}
    </State>
  )
}
