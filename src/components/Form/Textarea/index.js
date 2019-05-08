// @flow
import React, { Component } from 'react'
import classNames from 'classnames/bind'
import Label from '../Label'
import styles from './index.css'
const cx = classNames.bind(styles)

export type Props = {
  type?: string,
  id: string,
  className?: string,
  required?: boolean,
  disabled?: boolean,
  label?: string,
  id: string,
  defaultValue?: string,
  fill?: boolean,
  prefix?: string,
  name?: string,
  /** TODO: handle help texts */
  description?: string,
  hiddenLabel?: boolean
}

type State = {
  value: string
}

export default class Textarea extends Component<Props, State> {
  input: HTMLTextAreaElement
  state = {}
  onInput = (event: Event) => {
    this.setState({ value: this.input.value })
  }
  render() {
    const {
      id,
      className,
      required,
      disabled,
      label,
      defaultValue,
      fill,
      name,
      prefix = '',
      hiddenLabel,
      ...props
    } = this.props
    const { value } = this.state
    return (
      <div className={cx('Textarea', { 'Textarea--fill': fill }, className)}>
        {label ? (
          <Label
            htmlFor={id}
            className={cx('Textarea-label', {
              'ui-text-hidden': hiddenLabel
            })}
            required={required}
            disabled={disabled}
          >
            {label}
          </Label>
        ) : null}
        <div className={cx('Textarea-wrapper')}>
          <textarea
            ref={el => el && (this.input = el)}
            id={id}
            name={name ? prefix + name : null}
            disabled={disabled}
            onInput={this.onInput}
            className={cx('Textarea-input')}
            value={value || value === '' ? value : defaultValue}
            {...props}
          />
          <pre className={cx('Textarea-pre')}>
            {value || value === '' ? value : defaultValue}
          </pre>
        </div>
      </div>
    )
  }
}
