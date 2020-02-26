// @flow
import React, { type Node } from 'react'
import Icon, { type Props as IconProps } from 'ui/components/Icon'
import Link, { type Props as LinkProps } from 'ui/components/Link'
import classNames from 'classnames/bind'
import ConditionalWrapper from 'ui/helpers/ConditionalWrapper'
import styles from './index.css'

const cx = classNames.bind(styles)

export type Props = {
  className?: string,
  level?: number,
  asLevel?: number | string,
  icon?: string | IconProps,
  iconAfter?: boolean,
  text?: string,
  to?: string,
  children?: Node
}

export default function Title({
  className,
  level = 1,
  asLevel,
  icon,
  iconAfter,
  text,
  to,
  children,
  align,
  theme,
  inline
}: Props) {
  const Hx = !isNaN(level) ? `h${level}` : 'strong'
  return (
    <Hx
      className={cx(
        'Title',
        `text-heading${asLevel || level}`,
        {
          'Title--withIcon': icon,
          'Title--iconAfter': iconAfter,
          [`Title--${align}`]: align,
          [`Title--themed theme-${theme}`]: theme,
          'Title--inline': inline
        },
        className
      )}
    >
      <span className={cx('Title-wrapper')}>
        {icon ? (
          <Icon
            {...icon}
            type={icon.type || icon}
            className={cx('Title-icon', icon.className)}
          />
        ) : null}
        <ConditionalWrapper
          if={to}
          wrap={children => (
            <Link to={to} className={cx('Title-link')} plain>
              {children}
            </Link>
          )}
        >
          <span
            className={cx('Title-text')}
            dangerouslySetInnerHTML={text ? { __html: text } : null}
          >
            {text ? null : children}
          </span>
        </ConditionalWrapper>
      </span>
    </Hx>
  )
}
