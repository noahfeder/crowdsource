import { combineReducers } from 'redux';
import ItemReducer from "./items_reducer"

const RootReducer = combineReducers({
  items: ItemReducer
});

export default RootReducer;
