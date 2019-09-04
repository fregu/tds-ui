// @flow
import React, { type Node, Component } from 'react'
import classNames from 'classnames/bind'
import { Redirect } from 'react-router'
import Button from 'ui/components/Button'
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
  items: Array<TabProps>,
  bordered?: boolean,
  fill?: boolean,
  theme?: string,
  plain?: boolean,
  tabClassName?: string,
  selectedTabClassName?: string
}

type StateType = {
  selectedTabIndex?: number,
  minHeight?: number
}

export default class Tabs extends Component<Props, StateType> {
  state = {}
  el: HTMLElement
  onClick = index => {
    if (this.el && typeof window !== 'undefined') {
      const windowHeight = window.innerHeight
      const bounds = this.el.getBoundingClientRect()
      const minHeight = bounds.height

      this.setState({
        selectedTabIndex: index,
        minHeight
      })
    }
  }
  render() {
    const {
      className,
      items,
      bordered,
      fill,
      theme,
      plain,
      tabClassName,
      selectedTabClassName,
      selectedTabIndex: selectedTabIndexProp = 0
    } = this.props

    const { selectedTabIndex = selectedTabIndexProp, minHeight } = this.state
    const selectedTab = items[selectedTabIndex]

    return (
      <div
        ref={el => el && (this.el = el)}
        className={cx(
          'Tabs',
          {
            'Tabs--bordered': bordered,
            'Tabs--fill': fill,
            'Tabs--plain': plain
          },
          className
        )}
        style={{ minHeight: minHeight ? +minHeight + 'px' : 0 }}
      >
        <ul className={cx('Tabs-list')} role="tablist">
          {items.map(({ title, disabled, className }, index) => (
            <li
              key={index}
              className={cx('Tabs-item', {
                'Tabs-item--selected': index === selectedTabIndex
              })}
            >
              <Button
                className={cx('Tabs-tab', className, tabClassName, {
                  'Tabs-tab--selected': index === selectedTabIndex,
                  [selectedTabClassName]: index === selectedTabIndex
                })}
                plain
                disabled={disabled}
                role="tab"
                text={title}
                aria-selected={index === selectedTabIndex ? 'true' : 'false'}
                onClick={() => this.onClick(index)}
              />
            </li>
          ))}
        </ul>
        <div className={cx('Tabs-content', { [`theme-${theme}`]: theme })}>
          {selectedTab.to ? (
            <Redirect to={selectedTab.to} />
          ) : (
            <section
              className={cx('Tabs-panel', { 'layout-container': fill })}
              role="tabpanel"
            >
              {selectedTab.content}
            </section>
          )}
        </div>
      </div>
    )
  }
}
