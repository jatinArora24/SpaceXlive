import { combineReducers } from "redux";

const initialState = {
  upcomingLaunches: {},
  launchpads: {},
  pastlaunch:{},
  starlinkQ:{},
  rockets:{},
};
const starlinkReducer = (
  state = initialState.starlinkQ,
  action
) => {
  switch (action.type) {
    case "STARLINK":
      return action.data;
    default:
      return state;
  }
};
const rocketReducer = (
  state = initialState.rockets,
  action
) => {
  switch (action.type) {
    case "ROCKETS":
      return action.data;
    default:
      return state;
  }
};

const upcomingLaunchesReducer = (
  state = initialState.upcomingLaunches,
  action
) => {
  switch (action.type) {
    case "UPDATE":
      return action.data;
    default:
      return state;
  }
};

const launchpadReducer = (state = initialState.launchpads, action) => {
  switch (action.type) {
    case "LAUNCHPAD":
      return action.data;
    default:
      return state;
  }
};

const pastlaunchesReducer = (state = initialState.pastlaunch, action) => {
  switch (action.type) {
    case "PASTLAUNCH":
      return action.data;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  upcomingLaunches1: upcomingLaunchesReducer,
  launchpad: launchpadReducer,
  pastlaunch: pastlaunchesReducer,
  starlink: starlinkReducer,
  rocekts1: rocketReducer,
});

export default rootReducer;
