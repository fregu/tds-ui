// @flow
import React, { Component } from 'react'
import classNames from 'classnames/bind'
import Label from '../Label'
import Icon from 'ui/components/Icon'
import styles from './index.css'
const cx = classNames.bind(styles)

export type Props = {
  type?: string,
  id: string,
  className?: string,
  options: any,
  label?: string,
  disabled?: boolean,
  required?: boolean,
  prefix?: string,
  name?: string,
  fill?: boolean,
  id?: string,
  /** TODO: handle help texts */
  description?: string
}

const blankChars = '         '
export default class Select extends Component<Props> {
  input: HTMLSelectElement
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
  renderOptions = (options: any) =>
    Object.keys(options).map((key, index) =>
      typeof options[key] === 'object' ? (
        <optgroup key={'optgroup' + index} label={key}>
          {this.renderOptions(options[key])}
        </optgroup>
      ) : (
        <option key={'option' + key + '-' + index} value={key}>
          {options[key] + blankChars}
        </option>
      )
    )
  render() {
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
      ...attributes
    } = this.props
    return (
      <div className={cx('Select', { 'Select--fill': fill }, className)}>
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
        <div className={cx('Select-inputWrapper')}>
          <select
            {...attributes}
            id={id}
            name={prefix + name}
            disabled={disabled}
            ref={el => el && (this.input = el)}
            className={cx('Select-input')}
          >
            {this.renderOptions(options)}
          </select>
          <span className={cx('Select-pickerIcon')}>
            <Icon type="chevronDown" />
          </span>
        </div>
      </div>
    )
  }
}
