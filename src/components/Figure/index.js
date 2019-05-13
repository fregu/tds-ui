// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import './index.css'
const cx = classNames.bind({})

type dimensionProp = '1by1' | '4by3' | '16by9'
export type Props = {
  className?: string,
  url?: 'string',
  defer?: boolean,
  caption?: string,
  children?: Node,
  fit?: 'contain' | 'cover',
  size?: 'small' | 'medium' | 'large' | 'orginal',
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
  fit,
  size,
  defer, // TODO: defer loading
  caption,
  dimension,
  dimensions = {}
}: Props) {
  return (
    <figure
      className={cx('Figure', className, {
        [`Figure--${size || ''}`]: size,
        'Figure--fit': fit,
        [`Figure--${fit || ''}`]: fit,
        [`Figure--withDimension`]: dimension || Object.keys(dimensions).length,
        [`dimesion-${dimension || ''}`]: dimension
      })}
    >
      <div
        className={cx(
          'Figure-wrapper',
          {
            [`dimension-${dimension || ''}`]: dimension
          },
          Object.keys(dimensions).map(
            prefix =>
              `${prefix ? prefix + '-' : ''}dimension-${dimensions[prefix] ||
                ''}`
          )
        )}
      >
        <img src={url} className={cx('Figure-image')} />
      </div>
      {caption ? (
        <figcaption className={cx('Figure-caption')}>{caption}</figcaption>
      ) : null}
    </figure>
  )
}
