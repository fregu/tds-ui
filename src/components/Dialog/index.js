// @flow
import React, { Fragment, Component, type Node } from 'react'
import classNames from 'classnames/bind'
import Title from 'ui/components/Title'
import Button from 'ui/components/Button'
import Gutter from 'ui/components/Gutter'
import Connect from 'ui/helpers/Connect'
import Content from 'ui/helpers/Content'
import { closeDialog } from 'ui/store/actions/dialog'

import styles from './index.css'
const cx = classNames.bind(styles)

export type Props = {
  className?: string,
  headerContent?: Node,
  title?: string,
  content?: any,
  children?: any,
  onClose?: Function,
  dispatch: Function,
  actions?: Array<any>,
  modifiers?: Array<Modifier>
}
type Modifier = 'wide'

export default class Dialog extends Component<Props> {
  box: HTMLElement
  componentDidMount = () => {
    this.setFocus()
  }

  onClose = (callback?: Function) => {
    this.props.dispatch(closeDialog())

    if (this.props.onClose) {
      this.props.onClose()
    }
    if (callback) {
      callback()
    }
  }
  setFocus = () => {
    this.box.focus()
  }
  render() {
    const {
      className,
      headerContent,
      title,
      content,
      children,
      actions = [],
      modifiers = []
    } = this.props

    return (
      <Connect mapDispatchToProps={{ closeDialog }}>
        {({ closeDialog }) => (
          <Fragment>
            <div className={cx('Dialog-overlay')} tabIndex="0" />
            <span onFocus={this.setFocus} />
            <section
              className={cx(
                'Dialog',
                className,
                modifiers.map(mod => 'Dialog--' + mod)
              )}
              ref={el => el && (this.box = el)}
            >
              {title || headerContent ? (
                <header className={cx('Dialog-header')}>
                  {title ? (
                    <Title
                      className={cx('Dialog-title')}
                      level={2}
                      asLevel={4}
                      text={title}
                    />
                  ) : null}
                  {headerContent || null}
                </header>
              ) : null}
              <div className={cx('Dialog-contentWrapper')}>
                <div className={cx('Dialog-content')}>
                  {content ? <Content content={content} /> : children}
                </div>
              </div>
              {actions.length ? (
                <footer className={cx('Dialog-actions')}>
                  <Gutter tight align="end">
                    {actions.map((action, index) => (
                      <Button
                        size="small"
                        key={action.text || index}
                        {...action}
                        modifiers={['square']}
                        className={cx('Dialog-action', action.className)}
                        onClick={() => {
                          if (action.onClick) {
                            action.onClick()
                            closeDialog()
                          } else {
                            closeDialog()
                          }
                        }}
                      />
                    ))}
                  </Gutter>
                </footer>
              ) : null}
            </section>
            <span onFocus={this.setFocus} />
          </Fragment>
        )}
      </Connect>
    )
  }
}
