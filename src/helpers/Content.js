// @flow
import React, { Fragment, type Node } from 'react'
import cx from 'classnames'
import marked from 'marked'

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

type Props = {
  tag?: string,
  content?: Array<string | Node> | string,
  html?: string,
  markdown?: string,
  className?: string,
  replace?: {},
  partials?: {}
}
function replacer(string: string, patterns: {}) {
  let replaceString = string
  if (patterns && typeof replaceString === 'string') {
    Object.keys(patterns).forEach(
      pattern =>
        (replaceString = replaceString.replace(
          new RegExp(pattern, 'g'),
          patterns[pattern]
        ))
    )
  }
  return replaceString
}
export default function Content({
  content,
  html,
  markdown,
  className,
  partials = {},
  replace = {},
  tag: Tag = 'p'
}: Props) {
  if (html || (markdown && typeof (html || markdown) === 'string')) {
    const raw = replacer(markdown || html || '', replace)
    const output = markdown ? marked(raw) : raw
    return (
      <div
        className={cx('htmlContent', className)}
        dangerouslySetInnerHTML={{ __html: output }}
      />
    )
  }
  const paragraphs = (Array.isArray(content)
    ? content
    : typeof content === 'string'
    ? content.split(/\n/)
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
                    __html: marked(replacer(p, replace))
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
