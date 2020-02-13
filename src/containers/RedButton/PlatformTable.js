import React, { Component } from "react";
import TableWrapper         from "@iso/containers/Tables/AntTables/AntTables.styles.js";
import Table                from "@iso/components/uielements/table";
import Progress             from "@iso/components/uielements/progress";
import PlatformActions      from "./PlatformActions";
import Switch               from "./Switch";

const { Column } = Table;

class PlatformTable extends Component {

  constructor(props) {
    super(props);
    this.shortTimeout = 500;
    this.longTimeout = 5000;
    this.state = {
      loading: true,
      data: [],
      progress: {},
    };
    this.handler = new PlatformActions(props.apiUrl)
  }

  initPlatform = async () => {
    try {
      await this.handler.initUrlTable();
      const data = await this.handler.getDataList();
      this.setState({ data });
    } finally {
      this.setState({ loading: false });
    }

    await this.getProgress(this.timeout);
  };

  componentDidMount() {
    this.initPlatform()
  };

  getProgress = async (invokeAgain = true) => {
    if (!this.props.isActive && invokeAgain) {
      return setTimeout(this.getProgress, this.longTimeout);
    }
    const response = await this.handler.getProgress();
    const timeout = Object.keys(response).length ? this.shortTimeout : this.longTimeout;

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
    if (invokeAgain)
      setTimeout(this.getProgress, timeout);
  };

  render() {
    const { loading, data } = this.state;
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
              strategy={ this.handler.switchCampaigns }
              callback={ () => this.getProgress(false) }
            />
          ) }
        />
      </TableWrapper>
    )
  }
}

export default PlatformTable
