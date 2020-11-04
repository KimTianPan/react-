import React from "react";
import store, { reducer, initialState } from "./store";
import { EchartsContaiterUI } from "./echartsContaiterUI";
import { SET_OPTIONS } from "./actionsTypes";
import { EchartsOptions } from "./type";

export function EchartsContaiter(props: EchartsOptions) {
  const [state, dispatch] = React.useReducer(reducer, (initialState))
  const { options, width, height, id } = props.options
  React.useEffect(() => {
    dispatch({
      type: SET_OPTIONS,
      value: { options, width, height, id }
    })
  }, [props.options])
  return (
    <store.Provider value={{ state, dispatch }}>
      <EchartsContaiterUI ></EchartsContaiterUI>
    </store.Provider>
  )
}