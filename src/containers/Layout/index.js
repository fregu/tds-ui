// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import Connect from 'ui/helpers/Connect'
import Modal from 'ui/components/Modal'
// import Confirm from 'ui/components/Confirm'
// import Toaster from 'ui/components/Toaster'

import '../../base/index.css'
const cx = classNames.bind({})

type Props = {
  className?: string,
  children: Node
}

export default function Layout({ className, children }: Props) {
  return (
    <div className={cx('Layout', className)}>
      <Connect>
        {({ modal, confirm, loader, toasters = [] }) => (
          <div className={cx('Layout-wrapper')}>
            <div className={cx('Layout-content')}>{children}</div>
            {modal ? (
              <Modal
                {...modal}
                className={cx('Layout-modal', modal.className)}
              />
            ) : null}
            {/*
            // {confirm ? (
            //   <Confirm
            //     {...confirm}
            //     className={cx('Layout-confirm', confirm.className)}
            //   />
            // ) : null}
            // {toasters.length
            //   ? toasters.map(toaster => (
            //       <Toaster
            //         {...toaster}
            //         className={cx('Layout-toaster', toaster.className)}
            //       />
            //     ))
            //   : null}
            */}
          </div>
        )}
      </Connect>
    </div>
  )
}
