// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import ConditionalWrapper from 'ui/helpers/ConditionalWrapper'
import Link from 'ui/components/Link'
import styles from './index.css'
const cx = classNames.bind(styles)

type Props = {
  className?: string,
  modifiers?: Array<string>,
  horizontal?: boolean,
  items: Array<Node | { content: Node }>,
  type?: 'ordered' | 'unordered' | 'plain',
  columns?: {
    ''?: number,
    s?: number,
    m?: number,
    l?: number,
    xl?: number
  },
  striped?: boolean,
  theme?: string,
  divided?: boolean
}

export default function List({
  items = [],
  type,
  columns = {},
  className,
  horizontal,
  modifiers = [],
  striped,
  plain,
  theme,
  divided
}: Props) {
  const ListTag = type === 'ordered' ? 'ol' : 'ul'
  return (
    <div
      className={cx(
        'List',
        className,
        Object.keys(columns).map(
          breakpoint =>
            `${breakpoint && `${breakpoint}-`}columns-${columns[breakpoint] ||
              ''}`
        ),
        {
          [`List--${type}`]: type,
          'List--plain': plain,
          'List--striped': striped && items.length > 2,
          'List--divided': divided,
          'List--horizontal': horizontal,
          [`List--withTheme theme-${theme}`]: theme
        },
        modifiers.map(mod => 'List--' + mod)
      )}
    >
      <ListTag className={cx('List-list')}>
        {items.map(({ content, to, className, children, ...item }, index) => (
          <li
            key={index}
            {...item}
            className={cx('List-item', className, {
              'List-item--linked': to
            })}
          >
            <ConditionalWrapper
              if={to}
              wrap={children => (
                <Link to={to} plain className={cx('List-link')}>
                  {children}
                </Link>
              )}
            >
              {content || children || item}
            </ConditionalWrapper>
          </li>
        ))}
      </ListTag>
    </div>
  )
}
