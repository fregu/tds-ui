// @flow
import React, { Fragment, type Node } from 'react'
import marked from 'marked'

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
  className,
  partials = {},
  tag: Tag = 'p'
}: Props) {
  if (html || markdown) {
    return (
      <div
        className={'htmlContent'}
        dangerouslySetInnerHTML={{ __html: markdown ? marked(markdown) : html }}
      />
    )
  }
  const paragraphs = (Array.isArray(content)
    ? content
    : typeof content === 'string'
    ? content.split(/\n/).filter(Boolean)
    : []
  ).filter(Boolean)

  return (
    <Fragment>
      {paragraphs.length
        ? paragraphs.map((p, index) =>
            typeof p === 'string' ? (
              partials && partials[p] ? (
                partials[p]
              ) : (
                <Tag
                  key={index}
                  className={className}
                  dangerouslySetInnerHTML={{
                    __html: marked(p)
                      .trim()
                      .replace(/^<p>/, '')
                      .replace(/<\/p>/, '')
                  }}
                />
              )
            ) : (
              p
            )
          )
        : content}
    </Fragment>
  )
}
