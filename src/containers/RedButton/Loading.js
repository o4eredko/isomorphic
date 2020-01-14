import React, { Component } from 'react';
import Progress             from '@iso/components/uielements/progress';

export default class Loading extends Component {
  state = { loaded: 0 };

  componentDidMount() {
    if ('maxValue' in this.props && 'country' in this.props && 'updateStatus' in this.props)
      this.startLoading();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const loaded = !(prevState.loaded > 0 && prevState.loaded < 100);
    const unequal = JSON.stringify(prevProps) !== JSON.stringify(this.props);
    const props = 'maxValue' in this.props && 'country' in this.props && 'updateStatus' in this.props;
    if (props && loaded && unequal)
      this.startLoading();
  }

  startLoading = async () => {
    await this.trackLoading();
    const process = setInterval(async () => {
      if (this.state.loaded === 100) {
        await this.props.callbackSuccess();
        clearInterval(process);
        return;
      }
      await this.trackLoading();
    }, 1000)
  };

  trackLoading = async () => {
    let { updateStatus, maxValue } = this.props;
    const currentValue = await updateStatus(this.props.country);
    if (maxValue < 0) maxValue = 1;
    const loaded = Math.round(Math.abs(maxValue - currentValue) / maxValue * 100);
    this.setState({ loaded });
  };

  render() {
    const status = this.state.loaded === 100 ? 'success' : 'active';
    return (
      <Progress
        strokeColor={ { from: '#108ee9', to: '#87d068', } }
        percent={ this.state.loaded }
        status={ status }
      />
    )
  }
}