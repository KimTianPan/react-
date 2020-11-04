import 'babel-polyfill'
import * as React from 'react';
import { FORM_DATA } from './actionTypes';
const _join = require('loadsh')
const store = React.createContext(({} as any));
export const initialState = {
  formData: {

  }
}

export function reducer(state = initialState, action: any) {
  const { type, value } = action
  let newState = _join.cloneDeep(state);
  switch (type) {
    case FORM_DATA:
      newState.formData = value.formData;
      return newState;

    default: throw new Error();
  }


}
export default store;
