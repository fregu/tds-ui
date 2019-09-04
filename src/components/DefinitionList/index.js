// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import Grid, { GridCell, type WidthProps } from 'ui/components/Grid'
import ConditionalWrapper from 'ui/helpers/ConditionalWrapper'
import styles from './index.css'
const cx = classNames.bind(styles)

type DefinitionPairProps = {
  title: string,
  definition?: Node,
  definitions?: Array<Node>,
  titleClass?: string,
  definitionClass?: string
}
type ColumnProps = {
  ''?: number,
  s?: number,
  m?: number,
  l?: number,
  xl?: number
}
type Props = {
  className?: string,
  inline?: boolean,
  hiddenTitle?: boolean,
  noMargin?: boolean,
  items: Array<DefinitionPairProps>,
  widths?: WidthProps,
  columns?: number | ColumnProps
}

export default function DefinitionList({
  className,
  inline,
  hiddenTitle,
  noMargin,
  items = [],
  widths,
  columns
}: Props) {
  return (
    <div
      className={cx(
        'DefinitionList',
        className,
        {
          'DefinitionList--inline': inline,
          'DefinitionList--hiddenTitle': hiddenTitle,
          'DefinitionList--noMargin': noMargin
        },
        columns && typeof columns === 'object'
          ? Object.keys(columns).map(
              prefix =>
                `${prefix ? `${prefix}-` : ''}columns-${columns[prefix]}`
            )
          : null
      )}
    >
      <ConditionalWrapper
        if={!!widths}
        wrap={content => <Grid withGap>{content}</Grid>}
      >
        {items.map(
          (
            {
              title,
              titleClass,
              definitionClass,
              definitions = [],
              definition
            },
            index
          ) => (
            <ConditionalWrapper
              if={!!widths}
              key={index}
              wrap={content => <GridCell widths={widths}>{content}</GridCell>}
            >
              <dl className={cx('DefinitionList-pair')}>
                <dt
                  className={cx('DefinitionList-title', titleClass)}
                  dangerouslySetInnerHTML={
                    typeof title === 'string' ? { __html: title } : null
                  }
                >
                  {typeof title !== 'string' ? title : null}
                </dt>
                {definitions.map((definition, index) => (
                  <dd
                    title={typeof definition === 'string' ? definition : null}
                    key={index}
                    className={cx('DefinitionList-definition', definitionClass)}
                    dangerouslySetInnerHTML={
                      typeof definition === 'string'
                        ? { __html: definition || '–' }
                        : null
                    }
                  >
                    {typeof definition !== 'string' ? definition || '–' : null}
                  </dd>
                ))}
                {!definitions.length ? (
                  <dd
                    className={cx('DefinitionList-definition', definitionClass)}
                    title={typeof definition === 'string' ? definition : null}
                    dangerouslySetInnerHTML={
                      typeof definition === 'string'
                        ? { __html: definition || '–' }
                        : null
                    }
                  >
                    {typeof definition !== 'string' ? definition || '–' : null}
                  </dd>
                ) : null}
              </dl>
            </ConditionalWrapper>
          )
        )}
      </ConditionalWrapper>
    </div>
  )
}
