// @flow
import React, { Component, Fragment } from 'react'
import classNames from 'classnames/bind'
import Icon from 'ui/components/Icon'
import Link from 'ui/components/Link'
import State from 'ui/helpers/State'
import styles from './index.css'
const cx = classNames.bind(styles)

type Props = {
  className?: string,
  headers?: Array<CellProps>,
  rows?: Array<RowProps>,
  fill?: boolean,
  sortable?: boolean,
  modifiers?: Array<string>,
  modifiers?: Array<string>,
  inlinePadding?: boolean,
  style?: any,
  sortOn?: number
}

type CellProps =
  | string
  | {
      index?: number,
      to?: string,
      width?: number | string,
      align?: string,
      valign?: string,
      span?: number | string,
      content?: any,
      tag?: string,
      className?: string
    }
type RowProps =
  | Array<CellProps>
  | {
      index?: number,
      to?: string,
      cells: Array<CellProps>,
      content?: any,
      className?: string
    }

type StateTypes = {
  sortOn?: number,
  asc?: boolean
}

export default class Table extends Component<Props, StateTypes> {
  state = {
    sortOn: this.props.sortOn || -1,
    asc: true
  }
  sortOn = (index: number) => {
    this.setState({
      sortOn: index,
      asc: this.state.sortOn === index ? !this.state.asc : true
    })
  }
  sortRows = (row1: Array<any>, row2: Array<any>) => {
    const { sortOn, asc = 1 } = this.state
    const cells1 = Array.isArray(row1) ? row1 : row1.cells
    const cells2 = Array.isArray(row2) ? row2 : row2.cells
    if (
      typeof sortOn === 'undefined' ||
      (isNaN(sortOn) && sortOn < 0) ||
      typeof cells1[sortOn] === 'undefined' ||
      typeof cells2[sortOn] === 'undefined' ||
      ('sortOn' in cells1[sortOn] ? cells1[sortOn].sortOn : cells1[sortOn]) ===
        ('sortOn' in cells2[sortOn] ? cells2[sortOn].sortOn : cells2[sortOn])
    ) {
      return 0
    }
    const compare = cells1[sortOn].sortOn < cells2[sortOn].sortOn

    return compare ? (asc ? 1 : -1) : asc ? -1 : 1
  }

  render() {
    const {
      className,
      headers = [],
      rows = [],
      modifiers = [],
      sortable,
      fill,
      style,
      inlinePadding
    } = this.props

    const { sortOn, asc } = this.state
    const tableRows = rows
      .map(row => ({ ...(Array.isArray(row) ? { cells: row } : row) }))
      .map((row, rowIndex) => ({
        ...row,
        index: rowIndex,
        cells: row.cells.map((cell, cellIndex) => ({
          ...(!Array.isArray(cell) && typeof cell === 'object' ? cell : {}),
          index: cellIndex,
          content: cell?.content || cell,
          to: (typeof cell === 'object' && cell.to) || row.to
        }))
      }))
      .sort(this.sortRows)
    return (
      <div
        className={cx(
          'Table',
          className,
          { 'Table--fill': fill },
          modifiers.map(mod => `Table--${mod}`)
        )}
        style={inlinePadding ? { margin: '0 -0.5em' } : null}
      >
        <table className={cx('Table-table')} style={style}>
          {headers ? (
            <thead className={cx('Table-header')}>
              <tr className={cx('Table-row')}>
                {headers.map((cell, index) => {
                  const isSortable =
                    sortable &&
                    typeof tableRows[0].cells[index] === 'object' &&
                    'sortOn' in tableRows[0].cells[index]
                  return (
                    <th
                      onClick={isSortable ? () => this.sortOn(index) : null}
                      key={`head-${index}`}
                      width={cell.width || null}
                      align={cell.align || null}
                      valign={cell.valign || null}
                      colSpan={cell.span || null}
                      className={cx(
                        'Table-head',
                        { 'Table-head--sortable': isSortable },
                        cell.className || null
                      )}
                      style={inlinePadding ? { padding: '0.25em 0.5em' } : null}
                    >
                      {cell?.content || cell || ''}
                      {sortOn === index ? (
                        <Icon
                          className={cx('Table-headSortIcon')}
                          type={asc ? 'chevronDown' : 'chevronUp'}
                          size={'small'}
                        />
                      ) : null}
                    </th>
                  )
                })}
                <td className={cx('Table-cell Table-cell--empty')} />
              </tr>
            </thead>
          ) : null}
          <tbody className={cx('Table-body')}>
            {tableRows.map((row, index) => (
              <State
                key={`row-${index}`}
                state={{ expanded: row.expanded || false }}
              >
                {({ expanded, setState }) => (
                  <Fragment>
                    <tr
                      className={cx('Table-row', {
                        'Table-row--expanded': expanded,
                        'Table-row--linked': row.to
                      })}
                    >
                      {(row.cells || row).map((c, i) => {
                        const CellTag = c.tag === 'th' ? 'th' : 'td'
                        const cell = typeof c === 'string' ? { content: c } : c
                        const link = cell.to && (
                          <Link
                            to={cell.to}
                            plain
                            linkclassName={cx('Table-cellLink')}
                          >
                            {cell?.content}
                          </Link>
                        )
                        return (
                          <CellTag
                            key={`cell-${i}`}
                            heading={
                              (CellTag === 'td' &&
                                headers &&
                                headers[i] &&
                                headers[i].content) ||
                              null
                            }
                            width={cell.width}
                            align={cell.align}
                            valign={cell.valign}
                            colSpan={cell.span}
                            className={cx('Table-cell', cell.className, {
                              'Table-head': CellTag === 'th'
                            })}
                            style={
                              inlinePadding ? { padding: '0.25em 0.5em' } : null
                            }
                            onClick={
                              row?.content
                                ? () => setState({ expanded: !expanded })
                                : null
                            }
                          >
                            {link || cell.content || ''}
                          </CellTag>
                        )
                      })}
                      {row.to || row.content ? (
                        <td
                          className={cx('Table-cell Table-cell--empty')}
                          valign="middle"
                          onClick={() => setState({ expanded: !expanded })}
                        >
                          {row.content ? (
                            <Icon type={expanded ? 'minus' : 'plus'} />
                          ) : (
                            <Link
                              to={row.to}
                              modifiers={['block']}
                              plain
                              linkclassName={cx('Table-cellLink')}
                              icon={{ type: 'chevronRight' }}
                            />
                          )}
                        </td>
                      ) : (
                        <td className={cx('Table-cell Table-cell--empty')} />
                      )}
                    </tr>
                    {row && row.content && expanded ? (
                      <tr className={cx('Table-row Table-row--toggleRow')}>
                        <td
                          className={cx('Table-cell')}
                          colSpan={row.cells.length + 1}
                        >
                          <div className={cx('Table-toggleContent')}>
                            {row.content}
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                )}
              </State>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
