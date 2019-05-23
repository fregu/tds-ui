// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import { Redirect } from 'react-router'
import Button from 'ui/conponents/Button'
import State from 'ui/helpers/State'
import styles from './index.css'
const cx = classNames.bind(styles)

export type TabProps = {
  title: string,
  content?: Node,
  children?: Node,
  to?: string,
  className?: string,
  disabled?: boolean
}

export type Props = {
  className?: string,
  selectedTabIndex?: number,
  items: Array<TabProps>
}

export default function Tabs({
  className,
  items,
  selectedTabIndex = 0
}: Props) {
  return (
    <State state={{ selectedTabIndex }}>
      {({ selectedTabIndex, setState }) => {
        const selectedTab = items[selectedTabIndex]
        return (
          <div className={cx('Tabs', className)}>
            <ul className={cx('Tabs-list')} role="tablist">
              {items.map(({ title, disabled, className }, index) => (
                <li className={cx('Tabs-item')}>
                  <Button
                    className={cx('Tabs-tab', className, {
                      'Tabs-tab--selected': index === selectedTabIndex
                    })}
                    plain
                    disabled={disabled}
                    role="tab"
                    text={title}
                    aria-selected={
                      index === selectedTabIndex ? 'true' : 'false'
                    }
                    onClick={() => setState({ selectedTabIndex: index })}
                  />
                </li>
              ))}
            </ul>
            <div className={cx('Tabs-content')}>
              {selectedTab.to ? (
                <Redirect to={selectedTab.to} />
              ) : (
                <section className={cx('Tabs-panel')} role="tabpanel">
                  {selectedTab.content}
                </section>
              )}
            </div>
          </div>
        )
      }}
    </State>
  )
}
