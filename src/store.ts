import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import ReduxThunk from "redux-thunk";
import { socketIo } from "./middleware";
import SocketIO from './socketio';

const socket = new SocketIO()

const devTools =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__();

const enhancer = compose(
  applyMiddleware(
    ReduxThunk,
    socketIo(socket)
  ),
  devTools
);

export default createStore(rootReducer, enhancer);
