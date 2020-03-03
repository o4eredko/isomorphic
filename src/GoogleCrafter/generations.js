import React from "react";

import { connect } from "react-redux";
import actions from "src/GoogleCrafter/redux/generations/actions";

import Table from "src/ui/Table";


const { Column } = Table;


function Generations({ isLoading, generationList, loadGenerations }) {
  React.useEffect(() => {
    loadGenerations();
  }, []);

  return (
    <Table
      loading={isLoading}
      dataSource={ generationList }
      pagination={ { pageSize: 15 } }
    >
      <Column dataIndex="id" />
      <Column dataIndex="name" />
    </Table>
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
