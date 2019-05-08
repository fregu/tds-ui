// @flow
import React, { type Node } from 'react'
import Icon, { type Props as IconProps } from 'ui/components/Icon'
import Link, { type Props as LinkProps } from 'ui/components/Link'
import classNames from 'classnames/bind'
const cx = classNames.bind({})

export type Props = {
  className?: string,
  level?: number,
  asLevel?: number | string,
  icon?: IconProps,
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
  children
}: Props) {
  const Hx = !isNaN(level) ? `h${level}` : 'strong'
  return (
    <Hx
      className={cx(
        'Title',
        `text-heading${asLevel || level}`,
        {
          'Title--withIcon': icon
        },
        className
      )}
    >
      {icon ? (
        <Icon {...icon} className={cx('Title-icon', icon.className)} />
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
    </Hx>
  )
}
