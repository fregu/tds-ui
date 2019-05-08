// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import styles from './index.css'
const cx = classNames.bind(styles)

type Props = {
  className?: string,
  modifiers?: Array<string>,
  items: Array<Node>,
  type?: 'ordered' | 'unordered' | 'plain',
  columns?: {
    ''?: number,
    s?: number,
    m?: number,
    l?: number,
    xl?: number
  }
}

export default function List({
  items = [],
  type = 'plain',
  columns = {},
  className,
  modifiers = []
}: Props) {
  const ListTag = type === 'ordered' ? 'ol' : 'ul'
  return (
    <div
      className={cx(
        'List',
        `List--${type}`,
        className,
        Object.keys(columns).map(
          breakpoint =>
            `${breakpoint && `${breakpoint}-`}columns-${columns[breakpoint] ||
              ''}`
        ),
        modifiers.map(mod => 'List--' + mod)
      )}
    >
      <ListTag className={cx('List-list')}>
        {items.map((item, index) => (
          <li key={index} className={cx('List-item')}>
            {item}
          </li>
        ))}
      </ListTag>
    </div>
  )
}
