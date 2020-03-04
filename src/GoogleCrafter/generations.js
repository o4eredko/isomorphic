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
    startGeneration,
    onToggleClick,
  }) {
  React.useEffect(() => {
    loadGenerations();
    loadSettings();
  }, [loadGenerations, loadSettings]);

  const renderProgress = (processing, record) => {
    const percent = Number(processing);
    let status = getStatus(record);
    if (status === "paused") {
      status = "active";
    }

    return (
      <Progress
        percent={ percent }
        status={ status }
      />
    );
  };

  const getStatus = (record) => {
    const statuses = {0: "active", 1: "paused", 4: "exception", 6: "success"};
    const predicateList = [record.status, record.isDone, record.isPaused];
    const convertedBitmap = predicateList.map(p => Number(Boolean(p)));
    const sum = convertedBitmap.reduce((accumulator = 0, currentValue) => (accumulator << 1 | currentValue));
    return statuses[sum];
  };

  const renderStatus = (record) => {
    const status = getStatus(record);
    let className, title, onClick = null;
    const style = {
      fontSize: 24,
      color: "rgb(247, 93, 129)",
      cursor: "pointer"
    };

    switch (status) {
      case "active":
        className = "ion-ios-pause";
        title = "Pause generation";
        onClick = onToggleClick.bind(null, record.id);
        break;
      case "paused":
        className = "ion-ios-play";
        title = "Resume generation";
        onClick = onToggleClick.bind(null, record.id);
        break;
      case "exception":
        className = "ion-alert";
        title = record.status;
        break;
      case "success":
        className = "ion-ios-checkmark";
        title = "Generation done";
        break;
    }

    return (
      <Tooltip placement="left" title={ title }>
        <i className={ className } style={ style } onClick={ onClick } />
      </Tooltip>
    );
  };

  const renderTimelineButtons = (value, record) => {
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
          <Column
            width={ "30%" }
            dataIndex="name"
            title="Generation name"
          />
          <Column
            width={ "30%" }
            title="Generation progress"
            dataIndex="generation_complete"
            render={ renderProgress }
          />
          <Column
            width={ "20%" }
            key="timeline"
            title="Generation timeline"
            align="center"
            render={ renderTimelineButtons }
          />
          <Column
            width={ "20%" }
            key="status"
            title="Generation status"
            align="center"
            render={ renderStatus }
          />
        </Table>
      </Box>
    </LayoutWrapper>
  );
}

function mapStateToProps({ googleCrafter }) {
  return {
    isLoading: !!googleCrafter.loading.isLoading,
    generationList: googleCrafter.generations.generationList,
    settingsList: googleCrafter.settings.settingsList,
    sqlMap: googleCrafter.settings.sqlMap,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadGenerations: () => dispatch(generationActions.loadGenerations()),
    loadSettings: () => dispatch(settingsActions.loadSettings()),
    startGeneration: (payload) => dispatch(generationActions.startGeneration(payload)),
    onToggleClick: (id) => dispatch(generationActions.toggleProcessing(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Generations);
