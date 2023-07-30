import * as Actions from '../../Enums';

const initialState = {
  modalRef: null,
};

export function modalReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_REF':
      console.log(action);
      return {...state, modalRef: action.modalRef};

    default:
      return state;
  }
}
