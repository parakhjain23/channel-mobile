import * as Actions from '../../Enums';

const initialState = {
  modalizeRef: null,
};

export function modalReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_REF':
      console.log(action, 'action in modalReducer');
      return {...state, modalizeRef: action.ref};
    default:
      return state;
  }
}
