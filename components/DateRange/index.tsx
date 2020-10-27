import * as React from 'react'
import store, { reducer, initialState } from './store'
import { SET_ELMOPTIONS, SET_RANGES_BTN, SET_CALLBACK, SET_HASRANGES_BTN } from './actionsType'
import DateRangeUI from './views/Date_range_ui'
const moment = require('moment')
/**
 * 
 * @param props 
 * {
 *  showRangesBtn: boolean // 是否显示预定义配置按钮true显示，false不显示 默认值为true显示
 *  rangeButtons:[  // 配置预定义日期按钮
 *    {
        text:'今日', // 按钮文字
        defaultValue:[moment(),moment()], // 对应日期段
        actived:true, // 是否选中 true选中，false不选中
      },
      {
        text:'本周',
        defaultValue:[ moment().subtract(6,'days'),moment()],
        actived:false,
      },
      {
        text:'本月',
        defaultValue:[ moment().startOf('month'),moment()],
        actived:false,
      },
 *  ]
 * }
 */
const DateRange:React.FC<any> = (props) => {
  const [ state, dispatch ] = React.useReducer(reducer, (initialState as any))
  const { rangeButtons, onChange, showRangesBtn } = props
  React.useEffect(()=>{
    if(onChange){
      dispatch({
        type:SET_CALLBACK,
        value:{
          callBack:onChange
        }
      })
    }
  },[])
  React.useEffect(()=>{
    if(rangeButtons!==undefined){
      dispatch({
        type:SET_RANGES_BTN,
        value:{
          rangeButtons,
          showRangesBtn

        }
      })
    }
  },[rangeButtons])
  React.useEffect(()=>{
    dispatch({
      type:SET_ELMOPTIONS,
      value:{
        defaultValue:state.rangeButtons?state.rangeButtons[state.rangesText?state.rangesText:defaultValueSelect(state.rangeButtons)].defaultValue:[moment(),moment()],
      }
    })
    state.callBack&&state.callBack(state.rangeButtons?state.rangeButtons[state.rangesText?state.rangesText:defaultValueSelect(state.rangeButtons)].defaultValue:[moment(),moment()])
  },[state.rangesText])
  const defaultValueSelect = (values) => {
    const index = values.findIndex((value,index,array)=>{
      return value.actived
    })
    return index;
  }
  return (
    <store.Provider value={{state,dispatch}}>
      <DateRangeUI></DateRangeUI>
    </store.Provider>
  )
}

export default DateRange