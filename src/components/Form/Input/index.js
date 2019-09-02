// @flow
import React, { Component } from 'react'
import Label from '../Label'
import Icon, { type Props as IconProps } from 'ui/components/Icon'
import classNames from 'classnames/bind'
import { system } from 'ui/lang'
import styles from './index.css'
const cx = classNames.bind(styles)

const errorMessages = {
  badInput: 'Felaktigt format',
  customError: false,
  patternMismatch: 'Felaktigt format',
  rangeOverflow: 'Värde för högt',
  rangeUnderflow: 'Värde för lågt',
  stepMismatch: 'Mellan steg',
  tooLong: 'För långt värde',
  tooShort: 'För kort värde',
  typeMismatch: 'Felaktig typ på värde',
  valueMissing: 'Obligatoriskt fält',
  valid: 'all good',
  ...(system.form?.errorMessages || {})
}

export type Props = {
  /** Id is required. */
  id: string,
  type?: string,
  required?: boolean,
  disabled?: boolean,
  className?: string,
  inputClassName?: string,
  fill?: boolean,
  label?: string,
  prefix?: string,
  name?: string,
  size?: number,
  icon?: IconProps,
  rounded?: boolean,
  autoComplete?: string,
  onInput?: Function,
  onBlur?: Function,
  value?: string | number,
  /** Encodar name attributet för att undvika credit card autocomplete */
  hashed?: boolean,
  validate?: Function,
  errorMessage?: string,
  defaultValue?: string | number | Array<string | number>,
  /** TODO: handle help texts */
  // description?: string,
  hiddenLabel?: boolean,
  floatingLabel?: boolean,
  discreet?: boolean,
  plain?: boolean,
  hideCaret?: boolean,
  theme?: string
}
type State = {
  value?: string,
  isValid?: boolean,
  errors?: Array<string>
}
class Input extends Component<Props, State> {
  input: HTMLInputElement
  state = {}
  hasEventListener: boolean
  componentDidMount = () => {
    this.triggerInitEvent()
  }
  onFocus = (event: Event) => {
    this.setState({ hasFocus: true })
  }
  onBlur = (event: Event) => {
    this.validate(true)
    this.setState({ hasFocus: false })
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  }
  onInput = (event: Event) => {
    if (this.input.value !== this.state.value) {
      if (this.props.onInput) {
        this.props.onInput(event, this.input.value)
      }
      this.validate()
      this.setState({ value: this.input.value })
    }
  }
  onChange = (event: Event) => {
    if (this.props.onChange) {
      this.props.onChange(event, this.input.value)
    }
  }

  validate = (showErrors?: boolean) => {
    let isValid = true
    const errors = []

    if (this.props.validate) {
      isValid = this.props.validate(this.input.value)
      if (showErrors && !isValid && this.props.errorMessage) {
        errors.push(this.props.errorMessage)
      }
    }

    if (isValid && 'validity' in this.input && !this.input.validity.valid) {
      isValid = false

      const validity = this.input.validity
      for (var key in validity) {
        if (showErrors && validity[key]) {
          errors.push(errorMessages[key])
        }
      }
    }

    // Add listeners for change outside to revalidate on external input
    if (!this.hasEventListener && !isValid) {
      this.hasEventListener = true
      document.addEventListener('change', this.onOtherChange)
    } else if (this.hasEventListener && isValid) {
      this.hasEventListener = false
      document.removeEventListener('change', this.onOtherChange)
    }
    if (isValid || showErrors) {
      this.setState({ isValid, errors })
    }
  }
  onOtherChange = (event: Event) => {
    if (event.target !== this.input) {
      this.validate()
    }
  }
  hashString = (str: string) => {
    return (
      'b64:' +
      btoa(
        encodeURIComponent(str).replace(
          /%([0-9A-F]{2})/g,
          function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1)
          }
        )
      )
    )
  }
  hashName = (name: string) => {
    return name.match(/\[/)
      ? name
          .replace(/\]$/, '')
          .split(/\]?\[/g)
          .map((part, index) => this.hashString(part))
          .reduce(
            (nameString, part, index) =>
              nameString +
              (index !== 0 ? '[' : '') +
              part +
              (index !== 0 ? ']' : ''),
            ''
          )
      : this.hashString(name)
  }

  componentDidUpdate = (prevProps: Props) => {
    if (
      this.props.value !== prevProps.value ||
      this.props.defaultValue !== prevProps.defaultValue
    ) {
      if (this.props.value !== prevProps.value) {
        this.setState({ value: this.props.value })
      } else if (this.props.defaultValue !== prevProps.defaultValue) {
        this.setState({ value: this.props.defaultValue })
      }

      this.validate()
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
  focus = (select?: boolean) => {
    this.input.focus()
    if (select) {
      this.input.select()
    }
  }

  render() {
    const {
      id,
      type = 'text',
      required,
      disabled,
      className,
      inputClassName,
      label,
      icon,
      size,
      fill,
      errorMessage,
      validate,
      onBlur,
      onInput,
      prefix = '',
      name = '',
      autoComplete,
      hashed,
      rounded,
      hiddenLabel,
      floatingLabel,
      plain,
      theme,
      discreet,
      style,
      hideCaret,
      ...props
    } = this.props

    const { isValid = true, hasFocus, errors = [], value } = this.state

    return (
      <div
        style={style}
        className={cx('Input', className, {
          'Input--invalid': !isValid && errors.length,
          'Input--fill': fill,
          'Input--rounded': rounded,
          'Input--withIcon': !!icon,
          'Input--discreet': discreet || plain,
          'Input--floatingLabel': floatingLabel,
          'Input--hasValue': !!value,
          'Input--isEmpty': !value,
          'Input--hasFocus': hasFocus,
          'Input--withTheme': theme,
          'Input--hideCaret': hideCaret,
          [`Input--${type}`]: type
        })}
      >
        {label ? (
          <Label
            htmlFor={id}
            className={cx('Input-label', {
              'text-hidden': hiddenLabel
            })}
            disabled={disabled}
            required={required}
            content={label}
          />
        ) : null}
        <span
          className={cx('Input-inputWrapper', {
            [`theme-${theme || 'white'}`]: theme
          })}
          data-value={value}
        >
          {icon ? (
            <Icon
              {...(typeof icon === 'object' ? icon : {})}
              className={cx('Input-inputIcon', icon.className)}
              type={icon.type || icon}
            />
          ) : null}
          <input
            {...props}
            id={id}
            onInput={this.onInput}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
            ref={el => el && (this.input = el)}
            type={type}
            size={size}
            disabled={disabled}
            required={required}
            autoComplete={autoComplete}
            className={cx('Input-input', inputClassName)}
            name={hashed ? this.hashName(prefix + name) : name}
          />
        </span>
        {errors.length ? (
          <span className={cx('Input-error')}>
            <Icon className={cx('Input-errorIcon" type="warning')} />
            {errors[0]}
          </span>
        ) : null}
      </div>
    )
  }
}
export default Input
