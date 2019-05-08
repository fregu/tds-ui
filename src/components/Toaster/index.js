// @flow
import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { hideToaster } from 'ui/store/actions/toasters'
import Connect from 'ui/helpers/Connect'
import Title from 'ui/components/Title'
import styles from './index.css'
const cx = classNames.bind(styles)

type Props = {
  id: string,
  status?: string,
  className?: string,
  title?: string,
  content?: any,
  children?: any,
  persistent?: boolean,
  onClose?: Function,
  dispatch: Function
}
export default class Toaster extends Component<Props> {
  el: HTMLElement
  hideTimeout: TimeoutID
  hideDelay = 5000

  render() {
    const {
      id,
      status,
      className,
      title,
      content,
      children,
      persistent
    } = this.props
    const toasterDescriptionId = 'toaster' + id
    return (
      <Connect mapDispatchToProps={{ hideToaster }}>
        {({ hideToaster }) => {
          if (!persistent) {
            this.hideTimeout = setTimeout(hideToaster, this.hideDelay)
          }
          return (
            <section
              role="dialog"
              aria-describedby={toasterDescriptionId}
              className={cx(
                'Toaster',
                { [`Toaster--${status || ''}`]: status },
                className
              )}
              ref={el => el && (this.el = el)}
            >
              <div className={cx('Toaster-content')} id={toasterDescriptionId}>
                {title ? <Title level={3} asLevel={5} text={title} /> : null}
                {content || children}
              </div>
            </section>
          )
        }}
      </Connect>
    )
  }
}
