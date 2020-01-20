// @flow
import React, { type Node, Component } from 'react'
import Helmet from 'react-helmet'
import Button from 'ui/components/Button'
import { strings } from 'ui/lang'
import classNames from 'classnames/bind'
import Connect from 'ui/helpers/Connect'
import { trackPage } from 'ui/store/actions/analytics'
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
  closeClick?: Function,
  trackPage?: string,
  scrollToTop?: boolean | 'smooth',
  center?: boolean,
  middle?: boolean
}

export default class View extends Component<Props> {
  state = {
    isTracked: false
  }

  componentDidMount = () => {
    const supportsNativeSmoothScroll =
      'scrollBehavior' in document.documentElement.style
    const scrollToTop = this.props.scrollToTop

    if (scrollToTop && typeof window !== 'undefined') {
      if (supportsNativeSmoothScroll) {
        window.scrollTo({
          behavior: scrollToTop === 'smooth' ? 'smooth' : 'auto',
          top: 0,
          left: 0
        })
      } else {
        window.scrollTo(0, 0)
      }
    }
  }

  render() {
    const {
      fullView,
      backTo,
      closeClick,
      title,
      children,
      className,
      small,
      modifiers = [],
      scrollToTop,
      trackPage: trackPageAs,
      center,
      middle
    } = this.props

    const { isTracked } = this.state
    return (
      <Connect mapDispatchToProps={{ trackPage }}>
        {({ trackPage }) => {
          if (!isTracked && typeof window !== 'undefined') {
            trackPage({ title: trackPageAs || title })
            this.setState({ isTracked: true })
          }
          return (
            <div
              className={cx('View-wrapper', {
                'View-wrapper--overlay': fullView,
                'View--center': center,
                'View--middle': middle
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
        }}
      </Connect>
    )
  }
}
