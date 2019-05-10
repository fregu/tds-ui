// @flow
import React, { type Node } from 'react'
import classNames from 'classnames/bind'
import { Redirect } from 'react-router-dom'
import Connect from 'ui/helpers/Connect'
import Modal from 'ui/components/Modal'
import Dialog from 'ui/components/Dialog'
import Toaster from 'ui/components/Toaster'
import { initApp } from 'ui/store/actions/init'
import { setUrl } from 'ui/store/actions/navigation'

import '../../base/index.css'
const cx = classNames.bind({})

type Props = {
  className?: string,
  children: Node
}

export default function Layout({ className, children }: Props) {
  return (
    <div className={cx('Layout', className)}>
      <Connect
        mapDispatchToProps={{ initApp, setUrl }}
        mapStateToProps={({
          init,
          navigation,
          modal,
          dialog,
          toasters = []
        }) => ({
          init,
          navigation,
          modal,
          dialog,
          toasters
        })}
      >
        {({
          init,
          navigation: { redirect, url },
          modal,
          toasters = [],
          dialog,
          initApp,
          setUrl,
          dispatch
        }) => {
          if (typeof window !== 'undefined') {
            if (!init) {
              initApp()
            }
            const currentUrl = window.location.pathname.replace(root, '')
            if (redirect && redirect !== currentUrl) {
              return (
                <Redirect
                  to={redirect.replace(/^\//, `${window?.rootPath || ''}/`)}
                />
              )
            }
            if (url !== currentUrl) {
              setUrl(currentUrl)
            }
          }
          return (
            <div className={cx('Layout-wrapper')}>
              <div className={cx('Layout-content')}>{children}</div>
              {modal ? (
                <Modal
                  {...modal}
                  className={cx('Layout-modal', modal.className)}
                />
              ) : null}

              {dialog ? (
                <Dialog
                  {...dialog}
                  className={cx('Layout-confirm', dialog.className)}
                />
              ) : null}
              {toasters.length
                ? toasters.map(toaster => (
                    <Toaster
                      {...toaster}
                      className={cx('Layout-toaster', toaster.className)}
                    />
                  ))
                : null}
            </div>
          )
        }}
      </Connect>
    </div>
  )
}
