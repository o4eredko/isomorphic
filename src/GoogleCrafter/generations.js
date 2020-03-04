import React from "react";

import { connect } from "react-redux";

import generationActions from "src/GoogleCrafter/redux/generations/actions";
import settingsActions from "src/GoogleCrafter/redux/settings/actions";
import Generations from "src/GoogleCrafter/components/Generations";


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
