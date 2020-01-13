import React, { Component } from 'react';
import Progress             from '@iso/components/uielements/progress';

export default class Loading extends Component {
  state = {
    loaded: this.props.percent ? this.props.percent : 0,
    process: null,
  };

  componentDidMount() {
    if ('maxValue' in this.props && 'updateStatus' in this.props)
      this.setState(this.startLoading());
  }

  startLoading = () => {
    console.log("LOADING WAS STARTED");
    this.trackLoading();
    this.setState({
      process: setInterval(async () => {
        await this.trackLoading();
        if (this.state.loaded === 100) {
          console.log("LOADING WAS ENDED");
          clearInterval(this.state.process);
          this.setState({ process: null });
          this.props.callbackSuccess();
        }
      }, 1500)
    });
  };

  trackLoading = async () => {
    const { updateStatus, maxValue } = this.props;
    const currentValue = await updateStatus(this.props.country);
    const loaded = Math.round((maxValue - currentValue) / maxValue * 100);
    this.setState({ loaded });
  };

  render() {
    const status = this.state.loaded === 100 ? 'success' : 'active';
    return <Progress strokeColor={ {
      from: '#108ee9',
      to: '#87d068',
    } } percent={ this.state.loaded } status={ status } />
  }
}