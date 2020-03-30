// @flow
import React, { Component } from 'react'
import classNames from 'classnames/bind'
import Label from '../Label'
import Icon from 'ui/components/Icon'
import { Checkbox } from 'ui/components/Form'
import styles from './index.css'
const cx = classNames.bind(styles)

type OptionProps = {
  value?: string,
  text: string
}
export type Props = {
  type?: string,
  id: string,
  className?: string,
  options: Array<OptionProps>,
  plain?: boolean,
  label?: string,
  disabled?: boolean,
  required?: boolean,
  prefix?: string,
  name?: string,
  fill?: boolean,
  id?: string,
  placeholder?: string,
  /** TODO: handle help texts */
  description?: string,
  inline?: boolean,
  discreet?: boolean,
  floatingLabel?: boolean,
  multiple?: boolean,
  onChange?: Function
}

const blankChars = '&nbsp;&nbsp;&nbsp;&nbsp;'
export default class Select extends Component<Props> {
  input: HTMLSelectElement
  state = {}
  componentDidMount = () => {
    this.triggerInitEvent()
  }

  componentDidUpdate = (prevProps: Props) => {
    if (
      JSON.stringify(this.props.options) !== JSON.stringify(prevProps.options)
    ) {
      this.triggerInitEvent()
    }
  }

  onFocus = (event: Event) => {
    this.setState({ hasFocus: true })

    if (this.props.onFocus) {
      this.props.onFocus(event)
    }
  }

  onBlur = (event: Event) => {
    this.setState({ hasFocus: false })
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  }

  triggerInitEvent = () => {
    if (this.input) {
      let changeEvent
      try {
        changeEvent = new Event('initField', { bubbles: true })
      } catch (error) {
        changeEvent = document.createEvent('Event')
        changeEvent.initEvent('initField', false, false)
      }

      this.input.dispatchEvent(changeEvent)
    }
  }

  renderOptions = (options: Array<OptionProps>) =>
    options.map(({ value, text, key, options = [] }, index) =>
      options.length ? (
        <optgroup key={'optgroup' + (key || index)} label={text}>
          {this.renderOptions(options)}
        </optgroup>
      ) : !(this.state.values || []).find(
          ({ value: valuesVal }) => String(valuesVal) === String(value)
        ) ? (
        <option
          key={'option' + value + '-' + (key || index)}
          value={value}
          dangerouslySetInnerHTML={{ __html: text + blankChars }}
        />
      ) : null
    )

  render() {
    const { inputValue, hasFocus, values = [] } = this.state
    const {
      id,
      className,
      options = [],
      label,
      fill,
      required,
      disabled,
      prefix = '',
      name = '',
      placeholder,
      floatingLabel,
      discreet,
      plain,
      inline,
      multiple,
      onChange,
      ...attributes
    } = this.props
    return (
      <div
        className={cx('Select', {
          'Select--fill': fill,
          'Select--plain': plain,
          'Select--inline': inline,
          'Select--discreet': discreet,
          'Select--floatingLabel': floatingLabel,
          'Select--hasValue': inputValue,
          'Select--hasFocus': hasFocus,
          'Select--multiple': multiple
        })}
      >
        {label ? (
          <Label
            htmlFor={id}
            className={cx('Select-label')}
            required={required}
            disabled={disabled}
          >
            {label}
          </Label>
        ) : null}

        <div className={cx('Select-inputWrapper', className)}>
          {multiple && values.length ? (
            <div className={cx('Select-values')}>
              {values.map(option => (
                <Checkbox
                  className={cx('Select-valueTag')}
                  key={option.value}
                  id={`${id}-check-${option.value}`}
                  tag
                  label={option?.text}
                  defaultChecked
                  onChange={(e, checked) => {
                    if (!checked) {
                      this.setState({
                        values: values.filter(
                          ({ value: valValue }) =>
                            String(valValue) !== String(option?.value)
                        )
                      })
                    }
                  }}
                  name={prefix + name.replace(/(\[\])?$/, '[]')}
                  value={option?.value}
                />
              ))}
            </div>
          ) : null}
          {disabled ? (
            <select
              {...attributes}
              key={id + 'disabled'}
              id={id}
              disabled
              onChange={event =>
                this.setState({ inputValue: event.target.value })
              }
              className={cx('Select-input', 'Select-input--disabled')}
            >
              {placeholder ? (
                <option value={''} className={cx('Select-placeholder')}>
                  {placeholder}
                </option>
              ) : null}
              {this.renderOptions(options)}
            </select>
          ) : (
            <select
              {...attributes}
              id={id}
              name={multiple ? null : prefix + name}
              onChange={e => {
                const selectedOption = options
                  .reduce(
                    (all, option) => [
                      ...all,
                      ...(option.options ? option.options : [option])
                    ],
                    []
                  )
                  .find(
                    option => String(option.value) === String(e.target.value)
                  )
                if (multiple) {
                  this.setState({ values: [...(values || []), selectedOption] })
                }
                if (onChange) {
                  onChange(e, selectedOption)
                }
              }}
              disabled={disabled}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              ref={el => el && (this.input = el)}
              className={cx('Select-input')}
            >
              {placeholder ? (
                <option value={''} className={cx('Select-placeholder')}>
                  {placeholder}
                </option>
              ) : null}
              {this.renderOptions(options)}
            </select>
          )}

          <span className={cx('Select-pickerIcon')}>
            <Icon type="chevronDown" />
          </span>
        </div>
      </div>
    )
  }
}
