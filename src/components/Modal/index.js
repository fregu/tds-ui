// @flow
import React, { Fragment, Component } from 'react'
import classNames from 'classnames/bind'
import Title from 'ui/components/Title'
import Button from 'ui/components/Button'
import Connect from 'ui/helpers/Connect'
import { closeModal } from 'ui/store/actions/modal'
import { strings } from 'ui/lang'
import styles from './index.css'
const cx = classNames.bind(styles)

type Props = {
  className?: string,
  title?: string,
  content?: any,
  children?: any,
  onClose?: Function,
  persistent?: boolean,
  modifiers?: Array<string>
}

export default class Modal extends Component<Props> {
  box: HTMLElement
  componentDidMount = () => {
    this.setFocus()
  }

  setFocus = () => {
    this.box.focus()
  }
  render() {
    const {
      className,
      title,
      content,
      children,
      onClose,
      persistent,
      modifiers = []
    } = this.props
    return (
      <Connect mapDispatchToProps={{ closeModal }}>
        {({ closeModal: dispatchCloseModal }) => {
          const closeModal = () => {
            if (persistent) {
              return false
            }
            if (onClose) {
              onClose()
            }
            dispatchCloseModal()
          }
          return (
            <Fragment>
              <div
                className={cx('Modalbox-overlay')}
                onClick={closeModal}
                tabIndex="0"
                role="button"
              />
              <span onFocus={this.setFocus} />
              <section
                className={cx(
                  'Modalbox',
                  {
                    'Modalbox--withTitle': title
                  },
                  className,
                  modifiers.map(mod => 'Modalbox--' + mod)
                )}
                ref={el => el && (this.box = el)}
              >
                <header className={cx('Modalbox-header')}>
                  {title ? (
                    <Title
                      className={cx('Modalbox-title')}
                      level={2}
                      asLevel={4}
                    >
                      {title}
                    </Title>
                  ) : null}
                  {!persistent ? (
                    <Button
                      plain
                      hiddenText
                      className={cx('Modalbox-closebutton')}
                      onClick={closeModal}
                      size="large"
                      icon={{ type: 'close' }}
                      text={strings.general.close}
                    />
                  ) : null}
                </header>
                <div className={cx('Modalbox-content')}>
                  {content || children}
                </div>
              </section>
              <span onFocus={this.setFocus} />
            </Fragment>
          )
        }}
      </Connect>
    )
  }
}
