// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import Helmet from 'react-helmet'
import Button from 'ui/components/Button'
import { strings } from 'ui/lang'
import styles from './index.css'
const cx = classNames.bind(styles)

type Props = {
  title?: string,
  className?: string,
  modifiers?: Array<string>,
  children: Node,
  fullView?: boolean,
  small?: boolean,
  backTo?: string,
  closeClick?: Function
}

export default function View({
  fullView,
  backTo,
  closeClick,
  title,
  children,
  className,
  small,
  modifiers = []
}: Props) {
  return (
    <div
      className={cx('View-wrapper', {
        'View-wrapper--overlay': fullView
      })}
    >
      <article
        className={cx(
          'View',
          className,
          { 'View--fullView': fullView },
          modifiers.map(mod => 'View--' + mod)
        )}
      >
        <Helmet>{title ? <title>{title}</title> : null}</Helmet>
        {fullView && (backTo || closeClick) ? (
          <Button
            className={cx('View-closeButton')}
            modifiers={['plain', 'hiddenText']}
            size="large"
            icon={{ type: 'close' }}
            text={strings.general.close}
            onClick={closeClick}
            to={backTo}
          />
        ) : null}
        <div
          className={cx(
            'View-content',
            'layout-bottom-gutter',
            small ? 'layout-small-container' : 'layout-container'
          )}
        >
          {children}
        </div>
      </article>
    </div>
  )
}
