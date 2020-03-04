import React from "react";

import { connect } from "react-redux";

import actions from "src/GoogleCrafter/redux/generations/actions";
import LayoutWrapper from "src/utility/layoutWrapper";
import Box from "src/utility/box";
import PageHeader from "src/utility/pageHeader";
import Table from "src/ui/Table";
import Progress from "src/ui/Progress";
import Button from "src/ui/Button";
import { Icon, Tooltip } from "antd";


const { Column } = Table;


function Generations({ isLoading, generationList, loadGenerations }) {
  React.useEffect(() => {
    loadGenerations();
  }, []);

  const renderProgress = (processing, record, index) => {
    const percent = Number(processing);
    const isDone = Number(record.isDone);
    const status = record.status && !isDone ? "exception" : (percent === 100 ? "success" : "active");

    return (
      <Progress
        key={index}
        percent={percent}
        status={status}
      />
    ) ;
  };

  const renderStatus = (record) => {
    const isDone = Number(record.isDone);
    const status = !record.status && !Number(isDone) ? "pending" : (record.status === "OK" ? "success" : "exception");

    switch (status) {
      case "pending":
        return <Icon type="loading"/>;
      case "success":
        return <Icon type="check-circle"/>;
      case "exception":
        return (
          <Tooltip placement="leftTop" title={ record.status }>
            <Icon type="info-circle"/>
          </Tooltip>
        );
    }
  };

  const renderTimelineButtons = (value, record) => {
    return (
      <Icon
        type="dashboard"
        onClick={ console.log.bind(null, `Timeline click:`, value, record) }
      />
    );
  };

  const renderPauseResumeButtons = (value, record) => {
    return (
      <Icon
        type={ record.isPaused ? "caret-right" : "pause" }
        onClick={ console.log.bind(null, "Pause click:", value, record) }
      />
    );
  };

  return (
    <LayoutWrapper>
      <PageHeader>Google Crafter</PageHeader>
      <Box title="Crafter generations">
        {/*<GenerationForm genTypes={ genTypes } />*/}
        <Table
          rowKey="id"
          loading={ isLoading }
          dataSource={ generationList }
          pagination={ { pageSize: 15, current: 24 } }
        >
          <Column
            key="name"
            title="Generation name"
            dataIndex="name"
          />
          <Column
            key="progress"
            title="Generation progress"
            dataIndex="generation_complete"
            render={ renderProgress }
          />
          <Column
            key="timeline"
            title="Generation timeline"
            render={ renderTimelineButtons }
          />
          <Column
            key="pauseResume"
            title="Pause/Resume generation"
            render={ renderPauseResumeButtons }
          />
          <Column
            key="status"
            title="Status"
            render={ renderStatus }
          />
        </Table>
      </Box>
    </LayoutWrapper>
  );
}

function mapStateToProps({ googleCrafter }) {
  return {
    isLoading: googleCrafter.generations.isLoading,
    generationList: googleCrafter.generations.generationList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadGenerations: () => dispatch(actions.loadGenerations()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Generations);
