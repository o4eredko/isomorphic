import React, { Component }     from 'react';
import TableWrapper             from '@iso/containers/Tables/AntTables/AntTables.styles.js';
import Table                    from '@iso/components/uielements/table';
import Progress                 from '@iso/components/uielements/progress';
import Switch                   from '@iso/components/uielements/switch';
import message                  from '@iso/components/Feedback/Message';
import { loadState, saveState } from '@iso/lib/helpers/localStorage';

const { Column } = Table;

export default class PlatformTable extends Component {
  state = {
    loading: true,
    dataList: [],
  };

  componentDidMount() {
    this.props.platform.handler.getDataList().then(dataList => {
      this.setState({ loading: false, dataList });
      const campaignsSync = loadState('red-button-loading') || {};

      for (const campaign in campaignsSync) {

        const record = this.state.dataList[campaign];
        const loadingInterval = setInterval(async () => {
          if (!await this.trackLoading(record)) this.endLoading(record.key, loadingInterval);
        }, 2000);

      }
    });
  };

  startLoading = (record, completedValue) => {
    let campaignsSync = loadState('red-button-loading') || {};
    campaignsSync[record.key] = completedValue;
    saveState('red-button-loading', campaignsSync);

    this.setState(({ dataList }) => {
      dataList[record.key].loaded = 0;
      return { dataList };
    });

    const loadingInterval = setInterval(async () => {
      if (!(await this.trackLoading(record))) this.endLoading(record.key, loadingInterval);
    }, 2000);
  };

  endLoading = (id, interval) => {
    console.log("Loading was ended");
    const campaignsSync = loadState('red-button-loading');
    delete campaignsSync[id];
    saveState('red-button-loading', campaignsSync);
    clearInterval(interval);
  };

  trackLoading = async record => {
    const { handler } = this.props.platform;
    const campaignsSync = loadState('red-button-loading');

    const currentProgress = await handler.getCurrentStatus(record.country);
    const completedValue = campaignsSync[record.key];
    const loaded = ((completedValue - currentProgress) / campaignsSync[record.key]) * 100;
    this.setState(({ dataList }) => {
      dataList[record.key].loaded = loaded;
      return { dataList };
    });
    return currentProgress > 0;
  };

  handleSwitch = async (active, record) => {
    const { handler } = this.props.platform;
    try {
      await handler.switchCampaign(active, record);
      message.success(`Platform will be ${ active ? 'enabled' : 'disabled' }.`);
      const completedValue = await handler.getCurrentStatus(record.country);
      this.startLoading(record, completedValue);
    } catch {
      message.error('Something went wrong. Try again later.')
    }
  };

  render() {
    return (
      <TableWrapper
        pagination={ false }
        loading={ this.state.loading }
        dataSource={ this.state.dataList }
        className="isoSimpleTable"
      >
        <Column
          title="Country"
          dataIndex="country"
          key="country"
        />
        <Column
          title="Status"
          dataIndex="loaded"
          key="loaded"
          render={ loaded =>
            <Progress percent={ loaded } status={ loaded === 100 ? 'success' : 'active' } />
          }
        />
        <Column
          title="Active"
          dataIndex="active"
          key="active"
          align="center"
          render={ (active, record) => (
            <Switch
              defaultChecked={ active }
              onChange={ active => this.handleSwitch(active, record) }
            />
          ) }
        />
      </TableWrapper>
    )
  }
}