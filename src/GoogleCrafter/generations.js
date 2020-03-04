import React from "react";

import { connect } from "react-redux";
import actions from "src/GoogleCrafter/redux/generations/actions";

import LayoutWrapper from "src/utility/layoutWrapper";
import Box from "src/utility/box";
import PageHeader from "src/utility/pageHeader";
import Progress from "src/ui/Progress";
import Button from "src/ui/Button";
import { Popover, Typography, Icon, Tooltip } from "antd";
import { StyledTimeline, StyledTable as Table } from "src/GoogleCrafter/css/Generations.style";


const { Column } = Table;
const { Item } = StyledTimeline;
const { Text } = Typography;


function Generations({ isLoading, generationList, loadGenerations, onPauseResumeClick }) {
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
    let iconType, tooltipTitle;

    switch (status) {
      case "pending":
        iconType = "loading";
        tooltipTitle = "Processing";
        break;
      case "success":
        iconType = "check-circle";
        tooltipTitle = "Done";
        break;
      case "exception":
        iconType = "info-circle";
        tooltipTitle = record.status;
        break;
    }

    return (
      <Tooltip placement="left" title={ tooltipTitle }>
        <Icon type={ iconType } />
      </Tooltip>
    );
  };

  const renderTimelineButtons = (value, record, index) => {
    const eventPending = {
      dot: <Icon type="loading" />,
      color: "red"
    };

    const popoverContent = (
      <StyledTimeline mode="right">
        <Item { ...(!record["sql_start"] && eventPending) }>
          Sql start
          <Text strong> { record["sql_start"] }</Text>
        </Item>

        <Item { ...(!record["sql_end"] && eventPending) }>
          Sql end
          <Text strong> { record["sql_end"] }</Text>
        </Item>

        <Item { ...(!record["generation_start"] && eventPending) }>
          Generation start
          <Text strong> { record["generation_start"] }</Text>
        </Item>

        <Item { ...(!record["generation_start"] && eventPending) }>
          Generation end
          <Text strong> { record["generation_end"] }</Text>
        </Item>

        <Item { ...(!record["export_start"] && eventPending) }>
          Export start
          <Text strong> { record["export_start"] }</Text>
        </Item>
      </StyledTimeline>
    );

    return (
      <Popover content={ popoverContent }>
        <i className="ion-ios-more-outline" style={ { fontSize: 36, cursor: "pointer" } } />
      </Popover>
    );
  };

  const renderPauseResumeButtons = (record) => {
    return (
      <Icon
        type={ record.isPaused ? "caret-right" : "pause" }
        onClick={ onPauseResumeClick.bind(null, record.id) }
      />
    );
  };

  return (
    <LayoutWrapper>
      <PageHeader>Google Crafter</PageHeader>
      <Box title="Crafter generations">
        <Table
          loading={ isLoading }
          dataSource={ generationList }
          rowKey="id"
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
            align="center"
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
    onPauseResumeClick: (id) => dispatch(actions.toggleProcessing(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Generations);
