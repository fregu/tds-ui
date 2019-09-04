// @flow
import React, { Fragment, type Node } from 'react'

type Props = {
  tag?: string,
  content: Array<string | Node> | string,
  html?: string,
  markdown?: string
}

export default function Content({
  content,
  html,
  markdown,
  tag: Tag = 'p'
}: Props) {
  if (html) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />
  }
  const paragraphs = Array.isArray(content)
    ? content
    : typeof content === 'string'
    ? content.split('\n')
    : []
  return (
    <Fragment>
      {paragraphs.length
        ? paragraphs.map((p, index) =>
            typeof p === 'string' ? (
              <Tag key={index} dangerouslySetInnerHTML={{ __html: p }} />
            ) : (
              p
            )
          )
        : content}
    </Fragment>
  )
}
