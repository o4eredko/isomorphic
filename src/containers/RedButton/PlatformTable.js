import React, { Component } from 'react';
import TableWrapper         from '@iso/containers/Tables/AntTables/AntTables.styles.js';
import Table                from '@iso/components/uielements/table';
import Progress             from '@iso/components/uielements/progress';
import Switch               from './Switch';

const { Column } = Table;

class PlatformTable extends Component {
  process = null;
  state = {
    loading: true,
    data: [],
    progress: {},
  };

  componentDidMount() {
    const { handler } = this.props.platform;

    handler.getDataList()
      .then(data => this.setState({ data }))
      .finally(() => this.setState({ loading: false }));

    this.getProgress()
      .then(() => {
        this.process = setInterval(this.getProgress, 3000)
      });
  };

  componentWillUnmount = () => clearInterval(this.process);

  getProgress = async () => {
    if (!this.props.isActive) return;
    const { platform: { handler } } = this.props;
    const response = await handler.getProgress();
    const data = [...this.state.data];

    for (let record of data) {
      if (record.country in response) {
        record.active = (response[record.country].action === 'resume');
        record.loaded = response[record.country].progress;
      } else if (record.loaded !== 100) {
        record.loaded = 100;
      }
    }
    this.setState({ data });
  };

  render() {
    const { loading, data } = this.state;
    const { handler } = this.props.platform;
    return (
      <TableWrapper
        pagination={ false }
        loading={ loading }
        dataSource={ data }
        className="isoSimpleTable"
      >
        <Column
          title="Country"
          dataIndex="country"
          key="country"
          render={ countryCode => countryCode.toUpperCase() }
        />
        <Column
          title="Status"
          dataIndex="loaded"
          key="loaded"
          render={ loaded => (
            <Progress
              percent={ loaded }
              status={ loaded === 100 ? 'success' : 'active' }
              strokeColor={ { from: '#108ee9', to: '#87d068' } }
            />
          ) }
        />
        <Column
          title="Active"
          dataIndex="active"
          key="active"
          align="center"
          render={ (active, record) => (
            <Switch
              active={ active }
              country={ record.country }
              strategy={ handler.switchCampaigns }
              callback={ () => this.getProgress() }
            />
          ) }
        />
      </TableWrapper>
    )
  }
}

export default PlatformTable
