// @flow
import React from 'react'
import { NavLink } from 'react-router-dom'
import Icon, { type Props as IconProps } from 'ui/components/Icon'
import classNames from 'classnames/bind'
import styles from './index.css'
import Connect from 'ui/helpers/Connect'
import { type Props as DialogProps } from 'ui/components/Dialog'
import { confirmAction } from 'ui/store/actions/dialog'
import { trackEvent } from 'ui/store/actions/analytics'
import { redirectTo } from 'ui/store/actions/navigation'
const cx = classNames.bind(styles)

export type Props = {
  className?: string,
  children?: any,
  text?: string,
  size?: 'tiny' | 'small' | 'large' | 'normal',
  theme?: string,
  align?: 'left' | 'center' | 'right' | 'spread',
  onClick?: Function,
  icon?: string | IconProps,
  iconAfter?: boolean,
  to?: string,
  href?: string,
  tag?: Node | string,
  plain?: boolean,
  fill?: boolean,
  hiddenText?: boolean,
  noPadding?: boolean,
  disabled?: boolean,
  attributes?: any,
  primary?: boolean,
  secondary?: boolean,
  confirm?: string | DialogProps,
  round?: boolean,
  trackClick?: string
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
  align,
  to,
  href,
  tag,
  noPadding,
  confirm,
  primary,
  secondary,
  size,
  round,
  trackClick,
  ...attributes
}: Props) {
  const url = to || href || ''
  const localPath = url && url.match(/^\//)
  const isLink = url

  const ButtonTag = tag || (isLink ? (localPath ? NavLink : 'a') : 'button')
  const clickProps = isLink
    ? { to: localPath ? url : null, href: localPath ? null : url }
    : {}

  return (
    <Connect mapDispatchToProps={{ confirmAction, trackEvent }}>
      {({ confirmAction, trackEvent }) => (
        <ButtonTag
          {...clickProps}
          className={cx(
            'Button',
            {
              'Button--plain': plain,
              'Button--hiddenText': hiddenText,
              'Button--fill': fill,
              'Button--disabled': disabled,
              'Button--noPadding': noPadding,
              'Button--withIcon': icon,
              'Button--iconAfter': iconAfter,
              'Button--primary': primary,
              'Button--secondary': secondary,
              'Button--round': round,
              'Button--linked': isLink,
              [`Button--${align}`]: align,
              [`Button--${size}`]: size,
              [`Button--withTheme theme-${theme || ''}`]: theme
            },
            className
          )}
          plain={isLink || undefined}
          title={(hiddenText && text) || undefined}
          disabled={disabled}
          onClick={
            confirm || onClick || trackClick
              ? event => {
                  if (trackClick) {
                    console.log('trackevent', {
                      action: 'click',
                      category: 'Button',
                      label: trackClick
                    })
                    trackEvent({
                      action: 'click',
                      category: 'Button',
                      label: trackClick
                    })
                  }
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
                }
              : null
          }
          {...clickProps}
          {...attributes}
        >
          <div className={cx('Button-wrapper')}>
            {icon ? (
              <Icon
                {...(typeof icon === 'string' ? { type: icon } : icon)}
                className={cx('Button-icon', icon.className)}
              />
            ) : null}
            <span className={cx('Button-text', { 'hidden-text': hiddenText })}>
              {text || children}
            </span>
          </div>
        </ButtonTag>
      )}
    </Connect>
  )
}
