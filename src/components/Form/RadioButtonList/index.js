// @flow
import React from 'react'
import classnames from 'classnames/bind'
import List from 'ui/components/List'
import RadioButton, { type Props as RadioButtonProps } from '../RadioButton'
import State from 'ui/helpers/State'
import styles from './index.css'
const cx = classnames.bind(styles)

type Props = {
  id: string,
  label?: string,
  className?: string,
  modifiers?: Array<string>,
  defaultValue?: string,
  name?: string,
  options: Array<RadioButtonProps>,
  disabled?: boolean,
  /** TODO: handle required and valitidy as a group */
  required?: boolean,
  theme?: string,
  striped?: boolean,
  fill?: boolean,
  hiddenInput?: boolean
}

export default function RadioButtonList({
  id: listId,
  name,
  label,
  defaultValue,
  className,
  onChange,
  options = [],
  modifiers = [],
  disabled: listDisabled,
  required: listRequired,
  theme,
  icon,
  hiddenInput,
  striped,
  fill
}: Props) {
  return (
    <State>
      {({ values = defaultValue || [], setState }) => (
        <fieldset
          className={cx(
            'RadioButtonList',
            className,
            {
              'RadioButtonList--hiddenInput': hiddenInput,
              [`RadioButtonList--withTheme theme-${theme}`]: theme
            },
            modifiers.map(mod => 'RadioButtonList--' + mod)
          )}
        >
          {label ? (
            <legend className={cx('ui-text-label')}>{label}</legend>
          ) : null}
          <List
            className={cx('RadioButtonList-list')}
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
                  <RadioButton
                    key={value}
                    id={id || `${listId || name}-${value || index}`}
                    name={name}
                    value={value}
                    label={text}
                    fill={fill}
                    disabled={disabled || listDisabled}
                    required={required}
                    hiddenInput={hiddenInput}
                    {...props}
                    onChange={(e, isChecked) => {
                      if (isChecked) {
                        setState({ value })
                        if (typeof onChange === 'function') {
                          onChange(e, value)
                        }
                      }
                    }}
                    defaultChecked={defaultValue === value || defaultChecked}
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
