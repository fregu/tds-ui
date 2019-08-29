// @flow
import React, { Component } from 'react'
import classNames from 'classnames/bind'
import Label from '../Label'
import Icon from 'ui/components/Icon'
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
  description?: string
}

const blankChars = '         '
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
    options.map(({ value, text, options = [] }, index) =>
      options.length ? (
        <optgroup key={'optgroup' + index} label={text}>
          {this.renderOptions(options)}
        </optgroup>
      ) : (
        <option key={'option' + value + '-' + index} value={value}>
          {text + blankChars}
        </option>
      )
    )
  render() {
    const { inputValue } = this.state
    const {
      id,
      className,
      options = {},
      label,
      fill,
      required,
      disabled,
      prefix = '',
      name = '',
      placeholder,
      floatingLabel,
      plain,
      ...attributes
    } = this.props
    return (
      <div
        className={cx('Select', {
          'Select--fill': fill,
          'Select--plain': plain,
          'Select--floatingLabel': floatingLabel,
          'Select--hasValue': inputValue
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
          {disabled ? (
            <select
              key=""
              {...attributes}
              key={id + 'disabled'}
              id={id}
              name={prefix + name}
              disabled={disabled}
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
              name={prefix + name}
              disabled={disabled}
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
