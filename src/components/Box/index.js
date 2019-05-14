// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import Content from 'ui/helpers/Content'
import ConditionalWrapper from 'ui/helpers/ConditionalWrapper'
import Link from 'ui/components/Link'
import style from './index.css'
const cx = classNames.bind(style)

export type Props = {
  className?: string,
  theme?: string,
  children: Node,
  content: any,
  to?: string,
  background?: {
    color?: string,
    url?: string,
    position?: string,
    size?: string
  }
}

export default function Box({
  className,
  children,
  content,
  theme,
  to,
  shadowed,
  bordered,
  background = {}
}: Props) {
  return (
    <section
      className={cx('Box', className, {
        'Box--withTheme': theme,
        [`theme-${theme}`]: theme,
        'Box--bordered': bordered,
        'Box--shadowed': shadowed
      })}
      style={{
        ...(background.url
          ? { backgroundImage: `url(${background.url})` }
          : {}),
        ...(background.color ? { backgroundColor: background.color } : {}),
        ...(background.position
          ? { backgroundPosition: background.position }
          : {}),
        ...(background.size ? { backgroundSize: background.size } : {})
      }}
    >
      <ConditionalWrapper
        if={to}
        wrap={children => (
          <Link plain className={cx('Box-content')} to={to}>
            {children}
          </Link>
        )}
        else={children => <div className={cx('Box-content')}>{children}</div>}
      >
        {content ? <Content content={content} /> : children}
      </ConditionalWrapper>
    </section>
  )
}
