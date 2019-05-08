// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import './index.css'
const cx = classNames.bind({})

type dimensionProp = '1by1' | '4by3' | '16by9'
export type Props = {
  className?: string,
  url?: 'string',
  size?: 'cover' | 'contain' | 'auto',
  defer?: boolean,
  caption?: string,
  children?: Node,
  dimension?: dimensionProp,
  dimensions?: {
    ''?: dimensionProp,
    s?: dimensionProp,
    m?: dimensionProp,
    l?: dimensionProp
  }
}

export default function Figure({
  className,
  url,
  size,
  defer, // TODO: defer loading
  dimension,
  dimensions = {}
}: Props) {
  return (
    <figure
      className={cx(
        'Figure',
        className,
        {
          [`Figure--${size || ''}`]: size,
          [`dimesion-${dimension || ''}`]: dimension
        },
        Object.keys(dimensions).map(
          prefix =>
            `${prefix ? prefix + '-' : ''}dimesion-${dimensions[prefix] || ''}`
        )
      )}
    >
      <div className={cx('Figure-wrapper')}>
        <img src={url} className={cx('Figure-image')} />
      </div>
      {caption ? (
        <figcaption className={cx('Figure-caption')}>{caption}</figcaption>
      ) : null}
    </figure>
  )
}
