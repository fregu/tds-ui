// @flow
import React, { type Node, Component } from 'react'
import classNames from 'classnames/bind'
import styles from './index.css'
const cx = classNames.bind(styles)
type Width =
  | '1of2'
  | '1of3'
  | '1of4'
  | '1of5'
  | '1of6'
  | '2of3'
  | '2of5'
  | '3of4'
  | '3of5'
  | '4of5'
  | '4of6'
  | '5of6'
  | 'auto'
export type WidthProps = {
  ''?: Width,
  s?: Width,
  m?: Width,
  l?: Width,
  smax?: Width,
  mmax?: Width,
  lmax?: Width
}
type GridCellProps = {
  widths?: WidthProps,
  children?: Node
}

type Modifier = 'withGap' | 'wideGap' | 'inline'
type GridProps = {
  widths?: WidthProps,
  children: Node,
  className?: string,
  /** 'withGap' | 'wideGap' | 'inline' */
  modifiers?: Array<Modifier>,
  withGap?: boolean,
  align?: 'top' | 'bottom' | 'center'
}
export default function Grid({
  className,
  align,
  withGap,
  modifiers = [],
  widths = {},
  children
}: GridProps) {
  return (
    <div
      className={cx(
        'Grid',
        className,
        'Grid--' + align,
        { 'Grid--withGap': withGap },
        modifiers.map(mod => `Grid--${mod}`)
      )}
    >
      {[...((Array.isArray(children) && children) || [children])].map(
        (child, index) => {
          if (!child) {
            return null
          }
          return child
        }
      )}
    </div>
  )
}

export class GridCell extends Component<GridCellProps> {
  name = 'GridCell'
  render() {
    const { widths = {}, className, children } = this.props
    return (
      <div
        className={cx(
          'Grid-cell',
          className,
          Object.keys(widths).map(
            breakpoint =>
              `${breakpoint && `${breakpoint}-`}width-${widths[breakpoint] ||
                ''}`
          )
        )}
      >
        {children}
      </div>
    )
  }
}
