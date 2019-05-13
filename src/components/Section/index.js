// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import Title, { type Props as TitleProps } from 'ui/components/Title'
import Figure, { type Props as FigureProps } from 'ui/components/Figure'
import Icon, { type Props as IconProps } from 'ui/components/Icon'
import Link from 'ui/components/Link'
import ConditionalWrapper from 'ui/helpers/ConditionalWrapper'
import styles from './index.css'

const cx = classNames.bind(styles)

export type Props = {
  className?: string,
  to?: string,
  content?: Node,
  children?: Node,
  image?: FigureProps,
  imagePosition?: 'left' | 'top' | 'right' | 'bottom',
  icon?: IconProps,
  title?: TitleProps,
  theme?: string,
  bordered?: boolean
}

export default function Section({
  content,
  children,
  to,
  image,
  icon,
  imagePosition = 'left',
  title,
  className,
  theme,
  bordered
}: Props) {
  return (
    <section
      className={cx('Section', className, {
        'Section--withImage': image,
        [`Section--image${imagePosition.charAt(0).toUpperCase() +
          imagePosition.slice(1)}`]: image && imagePosition,
        'Section--withIcon': icon,
        'Section--withTitle': title,
        'Section--bordered': bordered,
        [`Section--withTheme theme-${theme || ''}`]: theme
      })}
    >
      <ConditionalWrapper
        if={to}
        wrap={children => (
          <Link to={to} plain className={cx('Section-wrapper')}>
            {children}
          </Link>
        )}
        else={children => (
          <div className={cx('Section-wrapper')}>{children}</div>
        )}
      >
        {image ? (
          <Figure
            {...image}
            className={cx('Section-figure', image.className)}
          />
        ) : null}
        <div className={cx('Section-contentWrapper')}>
          <header className={cx('Section-header')}>
            {title ? (
              <Title
                {...title}
                className={cx('Section-title', title.className)}
              />
            ) : null}
          </header>
          <div className={cx('Section-content')}>{content || children}</div>
        </div>
      </ConditionalWrapper>
    </section>
  )
}
