import React, { Component } from 'react';
import TableWrapper         from '@iso/containers/Tables/AntTables/AntTables.styles.js';
import Table                from '@iso/components/uielements/table';
import Switch               from '@iso/components/uielements/switch';
import Loading              from './Loading';
import Progress             from '@iso/components/uielements/progress';
import { connect }          from 'react-redux';
import redButtonActions     from '@iso/redux/redButton/actions'

const { fetchData, initSync, endSync, switchCampaigns } = redButtonActions;
const { Column } = Table;

class PlatformTable extends Component {
  componentDidMount() {
    const { dispatch, platform } = this.props;
    dispatch(fetchData(platform.handler.getDataList));
    dispatch(initSync(platform.name));
  };

  renderLoading = record => {
    const { sync, platform, dispatch } = this.props;
    if (record.key in sync)
      return (
        <Loading
          id={ record.key }
          country={ record.country }
          maxValue={ sync[record.key] }
          updateStatus={ platform.handler.getCurrentStatus }
          callbackSuccess={ () => dispatch(endSync(record.key, platform.name)) }
        />
      );
    return (
      <Progress
        strokeColor={ { from: '#108ee9', to: '#87d068' } }
        percent={ 100 }
        statuds='success'
      />
    )
  };

  render() {
    const { dispatch, platform: { handler }, platform } = this.props;
    return (
      <TableWrapper
        pagination={{ pageSize: 7 }}
        loading={ this.props.loading }
        dataSource={ this.props.data }
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
              onChange={ () => dispatch(switchCampaigns(handler, platform.name, record)) }
            />
          ) }
        />
      </TableWrapper>
    )
  }
}

function mapStateToProps(state) {
  const { data, loading, sync } = state.redButton;
  return { data, loading, sync }
}

export default connect(mapStateToProps)(PlatformTable)
