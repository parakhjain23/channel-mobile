// import * as SocketActions from '../SocketEnums';

import { call, takeLatest } from "redux-saga/effects";
import { INITIALIZE_SOCKET } from "../../redux/SocketEnums";
import { socketGenerator } from "./socketGeneratorFunctions";
import * as SocketActions from '../../redux/SocketEnums';

function* socketSaga() {
    yield takeLatest(SocketActions.INITIALIZE_SOCKET,socketGenerator);
  }
  
  export default socketSaga;