// @flow
import React, { Children, type Node, useState } from 'react'
import classNames from 'classnames/bind'
import Connect from 'ui/helpers/Connect'
import Loader from 'ui/components/Loader'
import Button, { type Props as ButtonProps } from 'ui/components/Button'
// import 'index.css'
const cx = classNames.bind({})

type Props = {
  children: Array<Node>,
  count?: number,
  counts?: {
    ''?: number,
    s?: number,
    m?: number,
    l?: number
  },
  showMoreCount?: number,
  showMoreText?: string,
  showMoreButton?: ButtonProps,
  wrap?: Function
}
export default function Paginator({
  children,
  count = 5,
  counts,
  showMoreCount,
  showMoreText = 'Show more',
  showMoreButton = {},
  wrap = children => children
}: Props) {
  const [showCount, setShowCount] = useState(
    typeof counts === 'undefined' && count
  )

  return (
    <Connect mapStateToProps={({ screen }) => ({ screen })}>
      {({ screen }) => {
        const breakpoints = {
          s: screen.minSmall,
          m: screen.minMedium,
          l: screen.minLarge,
          xl: screen.minXLarge
        }
        if (
          typeof counts !== 'undefined' &&
          !Object.keys(screen || []).length
        ) {
          return <Loader />
        }

        const paginateCount =
          (typeof counts === 'undefined' && count) ||
          (screen &&
            Object.keys(counts || {}).reduce((showCount, prefix) => {
              return !prefix || breakpoints[prefix] ? counts[prefix] : showCount
            }, false))

        if (paginateCount && !showCount) {
          setShowCount(paginateCount)
        }

        return !showCount ? (
          <Loader />
        ) : (
          <div className={cx('Paginator')}>
            <div className={cx('Paginator-content')}>
              {wrap(Children.toArray(children).splice(0, showCount))}
            </div>
            {children.length > showCount ? (
              <Button
                fill
                {...showMoreButton}
                onClick={() =>
                  setShowCount(showCount + (showMoreCount || paginateCount))
                }
                text={showMoreText}
              />
            ) : null}
          </div>
        )
      }}
    </Connect>
  )
}
