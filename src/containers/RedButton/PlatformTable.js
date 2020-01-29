import React, { Component } from 'react';
import TableWrapper         from '@iso/containers/Tables/AntTables/AntTables.styles.js';
import Table                from '@iso/components/uielements/table';
import Switch               from '@iso/components/uielements/switch';
import Loading              from './Loading';
import Progress             from '@iso/components/uielements/progress';
import { connect }          from 'react-redux';
import redButtonActions     from '@iso/redux/redButton/actions';
import Popconfirm           from '@iso/components/Feedback/Popconfirm';
import message              from '@iso/components/Feedback/Message';


const { fetchData, initSync, endSync, switchCampaigns } = redButtonActions;
const { Column } = Table;

class PlatformTable extends Component {
  componentDidMount() {
    const { dispatch, platform } = this.props;
    dispatch(fetchData(platform.name, platform.handler.getDataList));
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
          callbackSuccess={ () => dispatch(endSync(platform.name, record.key)) }
        />
      );
    return (
      <Progress
        strokeColor={ { from: '#108ee9', to: '#87d068' } }
        percent={ 100 }
        showInfo={ true }
        status="success"
      />
    )
  };

  render() {
    const { dispatch, platform: { name, handler } } = this.props;
    return (
      <TableWrapper
        pagination={ false }
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
            <Popconfirm
              placement="left"
              title="Are you sure？"
              okText="Do it!"
              cancelText="No"
              onConfirm={ () => dispatch(switchCampaigns(name, handler, record)) }
            >
              <Switch checked={ active } />
            </Popconfirm>
          ) }
        />
      </TableWrapper>
    )
  }
}

function mapStateToProps(state, props) {
  const { data, loading, sync } = state.redButton;
  return { data: data[props.platform.name], loading, sync: sync[props.platform.name] }
}

export default connect(mapStateToProps)(PlatformTable)
