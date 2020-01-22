import React, { Component } from 'react';
import Progress             from '@iso/components/uielements/progress';

export default class Loading extends Component {
  state = { loaded: false };

  componentDidMount() {
    if ('maxValue' in this.props && 'country' in this.props && 'updateStatus' in this.props)
      this.startLoading();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const unequal = JSON.stringify(prevProps) !== JSON.stringify(this.props);
    const props = 'maxValue' in this.props && 'country' in this.props && 'updateStatus' in this.props;
    if (props && prevState.loaded && unequal)
      this.startLoading();
  }

  startLoading = async () => {
    const process = setInterval(async () => {
      if (this.state.loaded) {
        await this.props.callbackSuccess();
        clearInterval(process);
        return;
      }
      await this.trackLoading();
    }, 3000)
  };

  trackLoading = async () => {
    let { updateStatus } = this.props;
    const currentValue = await updateStatus(this.props.country);
    if (currentValue === 0)
      this.setState({ loaded: true });
  };

  render() {
    return (
      <Progress
        strokeColor={ { from: '#108ee9', to: '#87d068', } }
        percent={ this.state.loaded ? 100 : 50 }
        showInfo={ this.state.loaded }
        status={ this.state.loaded ? 'success' : 'active' }
      />
    )
  }
}