// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import { system } from 'ui/lang'
import Icon, { type Props as IconProps } from 'ui/components/Icon'
import styles from './index.css'
const cx = classNames.bind(styles)

export type Props = {
  className?: string,
  modifiers?: Array<string>,
  htmlFor: string,
  children?: Node,
  content?: Node | string,
  text?: string,
  icon?: IconProps,
  required?: boolean,
  disabled?: boolean,
  /** TODO: handle help texts */
  description?: string,
  optionalLabel?: boolean
}

export default function Label({
  text,
  content,
  children,
  className,
  htmlFor,
  modifiers = [],
  required,
  disabled,
  icon,
  optionalLabel = true
}: Props) {
  return (
    <label
      className={cx(
        'Label',
        'text-label',
        className,
        {
          'Label--required': required,
          'Label--disabled': disabled,
          'Label--withContent': children || content
        },
        modifiers.map(mod => 'Label--' + mod)
      )}
      title={
        required
          ? system.form?.requiredField || 'Fältet är obligatoriskt'
          : null
      }
      htmlFor={htmlFor}
    >
      <span className={cx('Label-wrapper')}>
        {icon ? (
          <Icon {...icon} className={cx('Label-icon', icon.className)} />
        ) : null}
        <span className={cx('Label-text')}>{text || content || children}</span>
      </span>
      {required && !disabled ? (
        <sup
          className={cx('Label-requiredLabel', 'text-size-small')}
          title={system.form?.required || 'Required field'}
        >
          *
        </sup>
      ) : null}
    </label>
  )
}
