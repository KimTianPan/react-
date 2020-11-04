import * as React from 'react'
import { SET_OPTIONS } from './actionsTypes';
const _join = require('loadsh');
const store = React.createContext({} as any)
export const initialState = {

}
export function reducer(state = initialState, action) {
  const newState = _join.cloneDeep(state);
  const { value, type } = action
  switch (type) {
    case SET_OPTIONS:
      newState.options = value.options
      newState.width = value.width
      newState.height = value.height
      newState.id = value.id
      return { ...state, ...newState }
    default:
      throw new Error();
  }
}
export default store