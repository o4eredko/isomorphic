import React from "react";

import { connect } from "react-redux";
import generationActions from "src/GoogleCrafter/redux/generations/actions";
import settingsActions from "src/GoogleCrafter/redux/settings/actions";

import LayoutWrapper from "src/utility/layoutWrapper";
import Box from "src/utility/box";
import PageHeader from "src/utility/pageHeader";
import Progress from "src/ui/Progress";
import GenerationForm from "src/ui/Form/GenerationForm";
import Table from "src/ui/Table";
import { Popover, Typography, Icon, Tooltip } from "antd";
import { StyledTimeline } from "src/GoogleCrafter/css/Generations.style";


const { Column } = Table;
const { Item } = StyledTimeline;
const { Text } = Typography;


function Generations(
  {
    isLoading,
    sqlMap,
    settingsList,
    loadSettings,
    generationList,
    loadGenerations,
    pollGenerations,
    startGeneration,
    onPauseResumeClick,
  }) {
  React.useEffect(() => {
    loadGenerations();
    loadSettings();
    setInterval(pollGenerations, 5000)
  }, [loadGenerations, loadSettings]);

  const renderProgress = (processing, record, index) => {
    const percent = Number(processing);
    const isDone = Number(record.isDone);

    const statuses = ["success", "active", "exception"];

    let status = statuses[statuses.length - 1];
    if (!record.status || isDone)
      status = statuses[percent === 100];

    return (
      <Progress
        key={ index }
        percent={ percent }
        status={ status }
      />
    );
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
        <i
          className="ion-ios-more-outline"
          style={ { fontSize: 36, cursor: "pointer", lineHeight: "20px" } }
        />
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

  function onSubmit(value) {
    const settingsItem = settingsList.find(item => item.id == value);
    const data = {
      name: settingsItem.name,
      settings: settingsItem,
      sql: sqlMap[settingsItem.sql_id],
    };
    startGeneration(data);
  }

  return (
    <LayoutWrapper>
      <PageHeader>Google Crafter</PageHeader>
      <Box>
        <GenerationForm
          onSubmit={ onSubmit }
          genTypes={ Object.fromEntries(settingsList.map(item => [item.id, item.name])) }
        />
        <Table
          rowKey="id"
          size="middle"
          loading={ isLoading }
          dataSource={ generationList }
          pagination={ { pageSize: 15 } }
        >
          <Column dataIndex="name" title="Generation name" />
          <Column
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
            align="center"
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
    isLoading: googleCrafter.loading.isLoading,
    generationList: googleCrafter.generations.generationList,
    settingsList: googleCrafter.settings.settingsList,
    sqlMap: googleCrafter.settings.sqlMap,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadGenerations: () => dispatch(generationActions.loadGenerations()),
    pollGenerations: () => dispatch(generationActions.pollGenerations()),
    loadSettings: () => dispatch(settingsActions.loadSettings()),
    startGeneration: (payload) => dispatch(generationActions.startGeneration(payload)),
    onPauseResumeClick: (id) => dispatch(generationActions.toggleProcessing(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Generations);
