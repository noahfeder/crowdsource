import { combineReducers } from 'redux';
import Decisions from "./decisions"

const RootReducer = combineReducers({
  decisions: Decisions
});

export default RootReducer;
