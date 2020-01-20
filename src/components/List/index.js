// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import ConditionalWrapper from 'ui/helpers/ConditionalWrapper'
import Link from 'ui/components/Link'
import Icon, { type Props as IconProps } from 'ui/components/Icon'
import styles from './index.css'
const cx = classNames.bind(styles)

type Props = {
  className?: string,
  modifiers?: Array<string>,
  horizontal?: boolean,
  items: Array<Node | { content: Node } | string>,
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
  divided?: boolean,
  bulletIcon?: IconProps
}
export const ListItem = ({
  className,
  to,
  children,
  icon,
  linkClassName,
  text,
  content,
  bulletIcon,
  ...attributes
}) => (
  <li
    {...attributes}
    className={cx('List-item', className, {
      'List-item--linked': to
    })}
  >
    {bulletIcon ? (
      <Icon
        {...bulletIcon}
        className={cx('List-bulletIcon', bulletIcon.className)}
        type={bulletIcon.type || bulletIcon}
      />
    ) : null}
    <ConditionalWrapper
      if={to}
      wrap={children => (
        <Link
          to={to}
          {...attributes}
          plain
          block
          icon={icon}
          className={cx('List-link', linkClassName)}
        >
          {children}
        </Link>
      )}
    >
      {!to && icon ? (
        <Icon
          {...icon}
          type={icon.type || icon}
          className={cx('List-itemIcon', icon.className)}
        />
      ) : null}
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
  divided,
  bulletIcon
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
          'List--withBulletIcon': bulletIcon,
          [`List--withTheme theme-${theme}`]: theme
        },
        modifiers.map(mod => 'List--' + mod)
      )}
    >
      <ListTag className={cx('List-list')}>
        {items.map((item, index) => (
          <ListItem
            bulletIcon={bulletIcon}
            key={index}
            {...item}
            className={cx('List-item', itemClassName, item.className)}
            {...{
              ...(typeof item === 'object' ? item : {}),
              text: typeof item === 'string' ? item : item.text,
              children: item,
              linkClassName: cx(linkClassName, item.linkClassName)
            }}
          />
        ))}
      </ListTag>
    </div>
  )
}
