// @flow
import React, { Children, type Node } from 'react'
import classNames from 'classnames/bind'
import State from 'ui/helpers/State'
import Button, { type Props as ButtonProps } from 'ui/components/Button'
//import 'index.css'
const cx = classNames.bind({})

type Props = {
  children: Array<Node>,
  count?: number,
  showMoreCount?: number,
  showMoreText?: string,
  showMoreButton?: ButtonProps,
  wrap?: Function
}
export default function Paginator({
  children,
  count = 5,
  showMoreCount = 5,
  showMoreText = 'Show more',
  showMoreButton = {},
  wrap = children => children
}: Props) {
  return (
    <State>
      {({ showCount = count, setState }) => (
        <div className={cx('Paginator')}>
          <div className={cx('Paginator-content')}>
            {wrap(Children.toArray(children).splice(0, showCount))}
          </div>
          {children.length > showCount ? (
            <Button
              {...showMoreButton}
              onClick={() => setState({ showCount: showCount + showMoreCount })}
              text={showMoreText}
            />
          ) : null}
        </div>
      )}
    </State>
  )
}
