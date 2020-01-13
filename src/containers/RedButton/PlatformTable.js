import React, { Component }     from 'react';
import TableWrapper             from '@iso/containers/Tables/AntTables/AntTables.styles.js';
import Table                    from '@iso/components/uielements/table';
import Switch                   from '@iso/components/uielements/switch';
import message                  from '@iso/components/Feedback/Message';
import { loadState, saveState } from '@iso/lib/helpers/localStorage';
import Loading                  from './Loading';
import Progress                 from '@iso/components/uielements/progress';


const { Column } = Table;

export default class PlatformTable extends Component {
  state = {
    tableLoading: true,
    dataList: [],
    synchronizing: {},
  };

  componentDidMount() {
    const { name } = this.props.platform;
    // If there are no synchronizing for the current platform in localStorage, save as empty object,
    // otherwise restore progress to component's state.
    const campaignsSync = loadState('red-button-loading') || {};
    if (name in campaignsSync)
      this.setState({ synchronizing: campaignsSync[name] });
    else {
      campaignsSync[name] = {};
      saveState('red-button-loading', campaignsSync);
    }
    this.props.platform.handler.getDataList().then(dataList =>
      this.setState({ tableLoading: false, dataList })
    );
  };

  handleSwitch = async (active, record) => {
    const { handler, name } = this.props.platform;
    try {
      await handler.switchCampaign(active, record);
      message.success(`Platform will be ${ active ? 'enabled' : 'disabled' }.`);

      const campaignsMustBeSyncedNum = await handler.getCurrentStatus(record.country);
      // Update localStorage
      const campaignsSync = loadState('red-button-loading');
      campaignsSync[name][record.key] = campaignsMustBeSyncedNum;
      saveState('red-button-loading', campaignsSync);
      record.active = active;
      this.setState(({ dataList }) => ({
        dataList: dataList,
        synchronizing: campaignsSync[name],
      }));
    } catch (e) {
      console.error(e);
      message.error('Something went wrong. Try again later.')
    }
  };

  renderLoading = record => {
    if (record.key in this.state.synchronizing)
      return (
        <Loading
          id={ record.key }
          country={ record.country }
          maxValue={ this.state.synchronizing[record.key] }
          updateStatus={ this.props.platform.handler.getCurrentStatus }
          callbackSuccess={ () => {
            console.log("SUCCESS CALLBACK");
            const synchronizing = { ...this.state.synchronizing };
            delete synchronizing[record.key];
            const campaignsSync = loadState('red-button-loading');
            campaignsSync[this.props.platform.name] = synchronizing;
            saveState('red-button-loading', campaignsSync);
            this.setState({ synchronizing })
          } }
        />
      );
    return (
      <Progress
        strokeColor={ { from: '#108ee9', to: '#87d068' } }
        percent={ 100 }
        statuds='success'
      />)

  };

  render() {
    return (
      <TableWrapper
        pagination={ false }
        loading={ this.state.tableLoading }
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
          render={ (loaded, record) => this.renderLoading(record) }
        />
        <Column
          title="Active"
          dataIndex="active"
          key="active"
          align="center"
          render={ (active, record) => (
            <Switch
              checked={ active }
              onChange={ active => this.handleSwitch(active, record) }
            />
          ) }
        />
      </TableWrapper>
    )
  }
}