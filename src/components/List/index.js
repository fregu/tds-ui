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
export const ListItem = ({
  attributes,
  className,
  to,
  children,
  icon,
  linkClassName,
  text,
  content
}) => (
  <li
    {...attributes}
    className={cx('List-item', className, {
      'List-item--linked': to
    })}
  >
    <ConditionalWrapper
      if={to}
      wrap={children => (
        <Link
          to={to}
          plain
          block
          icon={icon}
          className={cx('List-link', linkClassName)}
        >
          {children}
        </Link>
      )}
    >
      {content || text || children}
    </ConditionalWrapper>
  </li>
)
export default function List({
  items = [],
  type,
  columns = {},
  className,
  itemClassName,
  linkClassName,
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
          'List--vertical': !horizontal,
          [`List--withTheme theme-${theme}`]: theme
        },
        modifiers.map(mod => 'List--' + mod)
      )}
    >
      <ListTag className={cx('List-list')}>
        {items.map(
          (
            {
              content,
              text,
              children,
              to,
              icon,
              className,
              attributes,
              ...item
            },
            index
          ) => (
            <ListItem
              key={index}
              className={cx('List-item', itemClassName, className)}
              {...{
                content,
                text: typeof item === 'string' ? item : text,
                children: item,
                to,
                icon,
                linkClassName: cx(linkClassName, item.linkClassName),
                attributes
              }}
            />
          )
        )}
      </ListTag>
    </div>
  )
}
