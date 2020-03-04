import React from "react";

import { connect } from "react-redux";
import actions from "src/GoogleCrafter/redux/generations/actions";

import LayoutWrapper from "src/utility/layoutWrapper";
import Box from "src/utility/box";
import PageHeader from "src/utility/pageHeader";
import Table from "src/ui/Table";
import Progress from "src/ui/Progress";
import Button from "src/ui/Button";
import { Popover, Typography, Icon } from "antd";
import { StyledTimeline } from "src/GoogleCrafter/css/Generations.style";


const { Column } = Table;
const { Item } = StyledTimeline;
const { Text } = Typography;


function Generations({ isLoading, generationList, loadGenerations }) {
  React.useEffect(() => {
    loadGenerations();
  }, []);

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
    return (
      <Button
        key={ index }
        style={ { width: 40 } }
        type="default"
        icon={ record.isPaused ? "caret-right" : "pause" }
        onClick={ console.log.bind(null, "Pause click:", value, record) }
      />
    );
  };

  return (
    <LayoutWrapper>
      <PageHeader>Google Crafter</PageHeader>
      <Box title="Crafter generations">
        {/*<GenerationForm genTypes={ genTypes } />*/ }
        <Table
          rowKey="id"
          loading={ isLoading }
          dataSource={ generationList }
          pagination={ { pageSize: 15 } }
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
