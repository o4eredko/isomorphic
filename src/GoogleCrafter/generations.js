import React from "react";

import { connect } from "react-redux";

import actions from "src/GoogleCrafter/redux/generations/actions";
import LayoutWrapper from "src/utility/layoutWrapper";
import Box from "src/utility/box";
import PageHeader from "src/utility/pageHeader";
import Table from "src/ui/Table";
import Progress from "src/ui/Progress";
import Button from "src/ui/Button";


const { Column } = Table;


function Generations({ isLoading, generationList, loadGenerations }) {
  React.useEffect(() => {
    loadGenerations();
  }, []);

  const renderTimelineButtons = (value, record, index) => {
    return (
      <Button
        key={ index }
        style={ { width: 40 } }
        type="default"
        icon="dashboard"
        onClick={ console.log.bind(null, `Timeline click:`, value, record) }
      />
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
        {/*<GenerationForm genTypes={ genTypes } />*/}
        <Table
          loading={isLoading}
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
