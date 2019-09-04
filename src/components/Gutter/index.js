// @flow
import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.css'
const cx = classNames.bind(styles)

type Props = {
  /** Vertical direction */
  vertical?: boolean,
  valign?: 'top' | 'middle' | 'top',
  align?: 'start' | 'center' | 'end',
  /** Tighter gaps */
  tight?: boolean,
  /** Wider gaps */
  wide?: boolean,
  /** Fill out the entire width */
  fill?: boolean,
  /** Spred all children over the width */
  spread?: boolean,
  children: any,
  className?: string,
  noWrap?: boolean,
  modifiers?: Array<string>,
  attributes?: any
}

export default function Gutter({
  vertical,
  tight,
  wide,
  align = 'left',
  valign = 'middle',
  fill,
  spread,
  children,
  className,
  noWrap,
  modifiers = [],
  attributes = {}
}: Props) {
  return (
    <div className={cx('Gutter-wrapper', className)} {...attributes}>
      <div
        className={cx(
          'Gutter',
          'Gutter--' + align,
          'Gutter--' + valign,
          {
            'Gutter--noWrap': noWrap,
            'Gutter--wideGap': wide,
            'Gutter--tightGap': tight,
            'Gutter--vertical': vertical,
            'Gutter--fill': fill,
            'Gutter--spread': spread
          },
          modifiers.map(mod => 'Gutter--' + mod)
        )}
      >
        {Array.isArray(children) ? (
          children
            .filter(Boolean)
            .map(({ gutterWidths = {}, ...child }, index) => (
              <div
                key={index}
                className={cx(
                  'Gutter-item',
                  Object.keys(gutterWidths).map(
                    prefix =>
                      `${prefix ? `${prefix}-` : ''}width-${
                        gutterWidths[prefix]
                      }`
                  )
                )}
              >
                {child}
              </div>
            ))
        ) : (
          <div className={cx('Gutter-item')}>{children}</div>
        )}
      </div>
    </div>
  )
}
