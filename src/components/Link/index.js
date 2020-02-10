// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import { NavLink } from 'react-router-dom'
import Button from 'ui/components/Button'
import Icon, { type Props as IconProps } from 'ui/components/Icon'
// import ConditionalWrapper from 'ui/helpers/ConditionalWrapper'
import Connect from 'ui/helpers/Connect'
import { trackEvent } from 'ui/store/actions/analytics'
import styles from './index.css'
const cx = classNames.bind(styles)

export type Props = {
  className?: string,
  text?: string,
  children?: Node,
  to?: string,
  href?: string,
  disabled?: boolean,
  plain?: boolean,
  block?: boolean,
  color?: string,
  icon?: string | IconProps,
  onClick?: Function,
  attributes?: any,
  trackClick?: string,
  textClass?: string
}

export default function Link({
  className,
  text,
  children,
  to,
  href,
  icon,
  plain,
  block,
  disabled,
  color,
  onClick,
  trackClick,
  textClass,
  ...attributes
}: Props) {
  const url = to || href || ''
  const localPath = url.match(/^\//)
  const TagName = url ? (localPath ? NavLink : 'a') : Button
  const linkProps = {
    className: cx(
      'Link',
      {
        'Link--withIcon': icon,
        'Link--plain': plain,
        'Link--block': block,
        'Link--disabled': disabled,
        [`Link--withColor color-${color}`]: color
      },
      className
    ),
    disabled,
    ...attributes
  }
  return (
    <Connect mapDispatchToProps={{ trackEvent }}>
      {({ trackEvent }) => (
        <TagName
          to={(localPath && !disabled && url) || null}
          href={(!localPath && !disabled && url) || null}
          {...linkProps}
          plain={linkProps.plain || !url || null}
          onClick={event => {
            if (trackClick) {
              trackEvent({
                action: 'click',
                category: 'Link',
                label: trackClick
              })
            }
            if (disabled || onClick) {
              event.stopPropagation()
            }
            if (typeof onClick === 'function') {
              onClick(event)
            }
          }}
        >
          <div className={cx('Link-wrapper')}>
            {icon ? (
              <Icon
                {...icon}
                type={icon.type || icon}
                className={cx('Link-icon', icon.className)}
              />
            ) : null}
            <span
              className={cx('Link-text', textClass)}
              dangerouslySetInnerHTML={text ? { __html: text } : null}
            >
              {text ? null : children}
            </span>
          </div>
        </TagName>
      )}
    </Connect>
  )
}
