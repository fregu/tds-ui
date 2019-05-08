// @flow
import React from 'react'
import Link from 'ui/components/Link'
import Icon, { type Props as IconProps } from 'ui/components/Icon'
import classNames from 'classnames/bind'
import styles from './index.css'
import Connect from 'ui/helpers/Connect'
import { confirmAction } from 'ui/store/actions/dialog'
import { redirectTo } from 'ui/store/actions/navigation'
const cx = classNames.bind(styles)

export type Props = {
  className?: string,
  children?: any,
  text?: string,
  size?: 'tiny' | 'small' | 'large' | 'normal',
  theme?: string,
  onClick?: Function,
  icon?: IconProps,
  iconAfter?: boolean,
  to?: string,
  href?: string,
  plain?: boolean,
  fill?: boolean,
  hiddenText?: boolean,
  disabled?: boolean,
  attributes?: any,
  primary?: boolean
}

export default function Button({
  className,
  text,
  children,
  plain,
  fill,
  hiddenText,
  disabled,
  onClick,
  icon,
  iconAfter,
  theme,
  to,
  href,
  confirm,
  primary,
  ...attributes
}: Props) {
  const ButtonTag = to || href ? Link : 'button'
  return (
    <Connect mapDispatchToProps={{ confirmAction }}>
      {({ confirmAction }) => (
        <ButtonTag
          className={cx(
            'Button',
            {
              'Button--plain': plain,
              'Button--hiddenText': hiddenText,
              'Button--fill': fill,
              'Button--disabled': disabled,
              'Button--withIcon': icon,
              'Button--iconAfter': iconAfter,
              'Button--primary': primary,
              [`theme-${theme || ''}`]: theme
            },
            className
          )}
          title={(hiddenText && text) || null}
          disabled={disabled}
          onClick={event => {
            if (disabled) {
              event.stopPropagation()
              return
            }

            if (confirm) {
              event.preventDefault()
              confirmAction(confirm, () =>
                to ? redirectTo(to) : onClick(event)
              )
            } else if (typeof onClick === 'function') {
              onClick(event)
            }
          }}
          {...attributes}
        >
          <div className={cx('Button-wrapper')}>
            {icon ? (
              <Icon {...icon} className={cx('Button--icon', icon.className)} />
            ) : null}
            <span
              className={cx('Button-text', { 'hidden-text': hiddenText })}
              dangerouslySetInnerHTML={text ? { __html: text } : null}
            >
              {children}
            </span>
          </div>
        </ButtonTag>
      )}
    </Connect>
  )
}
