import React from "react";

import { connect } from "react-redux";
import generationActions from "src/GoogleCrafter/redux/generations/actions";
import settingsActions from "src/GoogleCrafter/redux/settings/actions";

import LayoutWrapper from "src/utility/layoutWrapper";
import Box from "src/utility/box";
import PageHeader from "src/utility/pageHeader";
import Table from "src/ui/Table";
import Progress from "src/ui/Progress";
import Button from "src/ui/Button";
import { Popover, Typography, Icon } from "antd";
import { StyledTimeline } from "src/GoogleCrafter/css/Generations.style";
import GenerationForm from "src/ui/Form/GenerationForm";
import config from "src/FeedMaker/config";
import SuperFetch from "src/lib/helpers/superFetch";
import isErrorStatus from "src/lib/helpers/isErrorStatus";
import { message } from "antd";


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
  }) {
  React.useEffect(() => {
    loadGenerations();
    loadSettings();
  }, [loadGenerations, loadSettings]);

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

  const renderPauseResumeButtons = (value, record, index) => {
    return (<>
      <Icon type="pause" />
    </>);
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
          loading={ isLoading }
          dataSource={ generationList.reverse() }
          pagination={ { pageSize: 15 } }
        >
          <Column dataIndex="name" title="Generation name" />
          <Column
            key="progress"
            title="Generation progress"
            dataIndex="generation_complete"
            render={ (processing, row, index) =>
              <Progress
                key={ index }
                status={ processing !== 100 && !row.isDone ? "exception" : processing === 100 ? "success" : "active" }
                percent={ Number(processing) }
                showInfo={ false }
              /> }
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
        </Table>
      </Box>
    </LayoutWrapper>
  );
}

function mapStateToProps({ googleCrafter }) {
  return {
    isLoading: googleCrafter.generations.isLoading,
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Generations);
