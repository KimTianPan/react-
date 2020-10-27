import * as React from 'react'
import { SET_ELMOPTIONS, SELECT_RANGES, SET_RANGES_BTN, SET_CALLBACK } from './actionsType'
const _ = require('loadsh')
const moment = require('moment')
const store = React.createContext(({} as any));

export const initialState = {
  showRangesBtn: true,
  defaultValue:[],
  elmOptions:{},
  rangesText:'',
  rangeButtons:[
    // {
    //   text:'今日',
    //   defaultValue:[moment(),moment()],
    //   actived:false,
    // },
    // {
    //   text:'本周',
    //   defaultValue:[ moment().subtract(6,'days'),moment()],
    //   actived:true,
    // },
    // {
    //   text:'本月',
    //   defaultValue:[ moment().startOf('month'),moment()],
    //   actived:false,
    // },
  ]
}

export function reducer ( state = initialState, action:any) {
  const { type, value } = action
  let newState = _.cloneDeep(state)
  switch(type) {
    case SET_ELMOPTIONS:
      newState.defaultValue = value.defaultValue
      return newState;
    case SELECT_RANGES:
      newState.rangesText = value.rangesText
      return newState;
    case SET_RANGES_BTN:
      newState.showRangesBtn = value.showRangesBtn
      newState.rangeButtons = value.rangeButtons
      return newState;
    case SET_CALLBACK:
      newState.callBack = value.callBack
      return newState;
    default:
      throw new Error()
  }
}

export default store