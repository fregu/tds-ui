// @flow
import { type Node } from 'react'

type Props = {
  if: boolean,
  wrap: Function,
  else?: Function,
  children: Node
}

export default function ConditionalWrapper({
  if: ifTrue,
  wrap,
  else: elseWrap,
  children
}: Props) {
  return ifTrue
    ? wrap(children)
    : elseWrap
    ? elseWrap(children)
    : children || null
}
