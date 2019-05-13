// @flow
import React, { type Node, Component } from 'react'
import classNames from 'classnames/bind'
import serialize from 'form-serialize'
import styles from './index.css'
const cx = classNames.bind(styles)

export { default as Input } from './Input'
export { default as Select } from './Select'
export { default as Textarea } from './Textarea'
export { default as Checkbox } from './Checkbox'
export { default as CheckboxList } from './CheckboxList'
export { default as RadioList } from './RadioList'
export { default as Radio } from './Radio'

type Props = {
  className?: string,
  children?: any,
  method?: string,
  preventDefault?: boolean,
  onSubmit?: Function,
  onChange?: Function,
  fields?: Array<Node>
}
type State = {
  isChanged?: boolean,
  isValid?: boolean,
  valueString?: string
}
export default class Form extends Component<Props, State> {
  el: HTMLFormElement
  state = {
    isChanged: false,
    isValid: true,
    valueString: ''
  }
  componentDidMount = () => {
    // Set initial values to state
    const values = serialize(this.el, { hash: true, empty: true })
    this.setState({
      valueString: JSON.stringify(values)
    })
    this.el.addEventListener('initField', this.onChange)

    // check initial validation
    this.validateFields()
  }
  componentWillUnmount = () => {
    this.el.removeEventListener('initField', this.onChange)
  }
  onSubmit = (event: Event) => {
    const { onSubmit, preventDefault } = this.props

    // If submit handler is defined, prevent default behaviour
    if (event && (onSubmit || preventDefault)) {
      event.preventDefault()
    }
    // serialize state of formelements in object
    const values = this.decodeSerialized(
      serialize(this.el, { hash: true, empty: false })
    )
    const isValid = this.validateFields()

    if (onSubmit) {
      onSubmit(event, values, isValid)
    }
  }

  onChange = (event?: Event) => {
    // serialize state of formelements in object
    const values = this.decodeSerialized(
      serialize(this.el, { hash: true, empty: false })
    )
    const valueString = JSON.stringify(values)

    if (valueString !== this.state.valueString) {
      this.setState({
        valueString,
        isChanged: true
      })
    }
    const isValid = this.validateFields()
    // Pass change event to callback if available
    if (this.props.onChange) {
      this.props.onChange(event, values, isValid)
    }
  }
  triggerChange = () => {
    this.onChange()
  }

  decodeSerialized = (object: any) => {
    if (Array.isArray(object)) {
      return object
    }
    return Object.keys(object).reduce((newSerializedObject, key) => {
      try {
        const newKey = this.unHashName(key)
        newSerializedObject[newKey] =
          typeof object[key] === 'object'
            ? this.decodeSerialized(object[key])
            : object[key]
      } catch {
        newSerializedObject[key] = object[key]
      }
      return newSerializedObject
    }, {})
  }

  unHashName = (str: string) => {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    const isHashed = str.match(/^b64:(.*)/)
    return isHashed
      ? decodeURIComponent(
          atob(isHashed[1])
            .split('')
            .map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
        )
      : str
  }
  validateFields = () => {
    if (this.el && this.el.elements) {
      // Loop through all form elements and run native checkValidity()
      const isValid = Array.prototype.every.call(this.el.elements, el =>
        el.checkValidity()
      )
      if (this.state.isValid !== isValid) {
        this.setState({
          isValid
        })
      }
      return isValid
    }
  }

  render() {
    const {
      className,
      preventDefault,
      children,
      fields = [],
      method = 'get',
      ...attributes
    } = this.props

    return (
      <form
        {...attributes}
        className={cx('Form', className)}
        method={method}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        onPaste={this.onChange}
        autoComplete="off"
        ref={el => el && (this.el = el)}
      >
        {fields.map((field, index) => (
          <div key={index} className={cx('Form-field')}>
            {field}
          </div>
        ))}
        {children}
      </form>
    )
  }
}
