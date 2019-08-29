// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import { NavLink } from 'react-router-dom'
import Icon, { type Props as IconProps } from 'ui/components/Icon'
import ConditionalWrapper from 'ui/helpers/ConditionalWrapper'
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
  icon?: IconProps,
  onClick?: Function,
  attributes?: any
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
  onClick,
  attributes
}: Props) {
  const url = to || href || ''
  const linkProps = {
    className: cx(
      'Link',
      {
        'Link--withIcon': icon,
        'Link--plain': plain,
        'Link--block': block,
        'Link--disabled': disabled
      },
      className
    ),
    onClick: event => {
      if (disabled || onClick) {
        event.stopPropagation()
      }
      if (typeof onClick === 'function') {
        onClick(event)
      }
    },
    disabled,
    ...attributes
  }
  return (
    <ConditionalWrapper
      if={url.match(/^\//)}
      wrap={children => (
        <NavLink to={url} {...linkProps}>
          {children}
        </NavLink>
      )}
      else={children => (
        <a href={url} {...linkProps}>
          {children}
        </a>
      )}
    >
      <div className={cx('Link-wrapper')}>
        {icon ? (
          <Icon {...icon} className={cx('Link-icon', icon.className)} />
        ) : null}
        <span
          className={cx('Link-text')}
          dangerouslySetInnerHTML={text ? { __html: text } : null}
        >
          {text ? null : children}
        </span>
      </div>
    </ConditionalWrapper>
  )
}
