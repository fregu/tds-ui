// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import Title, { type Props as TitleProps } from 'ui/components/Title'
import Figure, { type Props as FigureProps } from 'ui/components/Figure'
import Icon, { type Props as IconProps } from 'ui/components/Icon'
import Link from 'ui/components/Link'
import ConditionalWrapper from 'ui/helpers/ConditionalWrapper'
import { type WidthProps } from 'ui/components/Grid'
import styles from './index.css'

const cx = classNames.bind(styles)

export type Props = {
  className?: string,
  to?: string,
  content?: Node,
  children?: Node,
  figureContent?: Node,
  image?: FigureProps,
  imagePosition?: 'left' | 'top' | 'right' | 'bottom',
  imageWidths?: WidthProps,
  icon?: IconProps,
  title?: string | TitleProps,
  theme?: string,
  bordered?: boolean,
  wideGap?: boolean
}

export default function Section({
  content,
  children,
  to,
  image,
  figureContent,
  icon,
  imagePosition = 'left',
  imageWidths = {},
  title,
  className,
  theme,
  bordered,
  valign,
  wideGap
}: Props) {
  return (
    <section
      className={cx('Section', className, {
        'Section--withImage': image || figureContent,
        [`Section--image${imagePosition.charAt(0).toUpperCase() +
          imagePosition.slice(1)}`]: (image || figureContent) && imagePosition,
        'Section--withIcon': icon,
        'Section--withTitle': title,
        'Section--bordered': bordered,
        'Section--widegap': wideGap,
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
        {figureContent || image ? (
          <div
            className={cx(
              'Section-figureWrapper',
              Object.keys(imageWidths).map(
                breakpoint =>
                  `${breakpoint && `${breakpoint}-`}width-${imageWidths[
                    breakpoint
                  ] || ''}`
              ),
              {
                [`flex-row flex-center flex-${
                  valign === 'center' ? 'middle' : valign
                }`]: valign
              }
            )}
          >
            {image ? (
              <Figure
                {...image}
                className={cx('Section-image', image.className)}
              />
            ) : (
              figureContent
            )}
          </div>
        ) : null}
        <div className={cx('Section-contentWrapper')}>
          <header className={cx('Section-header')}>
            {title ? (
              <Title
                {...(typeof title === 'string' ? { text: title } : title)}
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
