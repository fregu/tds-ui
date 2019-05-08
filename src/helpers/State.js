// @flow
import { Component } from 'react'
type Props = {
  didMount?: Function,
  didUpdate?: Function,
  willUnmount?: Function,
  derive?: Function,
  state?: any,
  children: any
}
type StateProps = any

export default class State extends Component<Props, StateProps> {
  state = this.props.state
  componentDidMount = () => {
    if (this.props.state) {
      this.setState(this.props.state)
    }
    if (this.props.didMount) {
      this.props.didMount()
    }
  }
  componentDidUpdate = (prevProps: Props, prevState: StateProps) => {
    if (this.props.didUpdate) {
      this.props.didUpdate({
        props: this.props.state,
        prevProps: prevProps.state,
        prevState,
        state: this.state
      })
    }
    if (this.props.derive) {
      const newState = this.props.derive(this.props.state)
      if (newState) {
        this.setState(newState)
      }
    }
  }
  componentWillUnmount = () => {
    if (this.props.willUnmount) {
      this.props.willUnmount()
    }
  }
  render() {
    const { children } = this.props
    return children({
      ...this.state,
      setState: this.setState.bind(this)
    })
  }
}
