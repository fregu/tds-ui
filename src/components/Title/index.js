// @flow
import React, { type Node } from 'react'
import Icon, { type Props as IconProps } from 'ui/components/Icon'
import Link, { type Props as LinkProps } from 'ui/components/Link'
import classNames from 'classnames/bind'
import styles from './index.css'
const cx = classNames.bind(styles)

export type Props = {
  className?: string,
  level?: number,
  asLevel?: number | string,
  icon?: string | IconProps,
  text?: string,
  to?: string,
  children?: Node
}

export default function Title({
  className,
  level = 1,
  asLevel,
  icon,
  text,
  to,
  children,
  align
}: Props) {
  const Hx = !isNaN(level) ? `h${level}` : 'strong'
  return (
    <Hx
      className={cx(
        'Title',
        `text-heading${asLevel || level}`,
        {
          'Title--withIcon': icon,
          [`Title--${align}`]: align
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
        <span
          className={cx('Title-text')}
          dangerouslySetInnerHTML={{ __html: text }}
        >
          {to ? (
            <Link to={to} className={cx('Title-link')} cover plain>
              {children}
            </Link>
          ) : (
            children
          )}
        </span>
      </span>
    </Hx>
  )
}
