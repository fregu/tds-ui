// @flow
import React, { type Node,Component } from 'react'
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
  items: Array<TabProps>
}

type StateType = {
  selectedTabIndex?: number,
  minHeight?: number
}

export default class Tabs extends Component<Props, StateType> {
  state = {}
  el: HTMLElement
  onClick = (index) => {
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
      selectedTabIndex: selectedTabIndexProp = 0
    } = this.props

    const { selectedTabIndex = selectedTabIndexProp, minHeight } = this.state
    const selectedTab = items[selectedTabIndex]

    return (
      <div ref={el => el && (this.el = el)} className={cx('Tabs', className)} style={{ minHeight: minHeight ? +minHeight + 'px' : 0 }}>
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
                onClick={() => this.onClick(index)}
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
  }
}
