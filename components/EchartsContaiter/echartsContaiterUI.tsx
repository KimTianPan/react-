import * as React from 'react'
import store, { initialState, reducer } from './store';
const echarts = require('echarts');
export function EchartsContaiterUI(props) {
  const { state, dispatch } = React.useContext(store);
  const { options, width, height, id } = state
  React.useEffect(() => {
    if (options) {
      echartsInit()
    }
  }, [state])
  // React.useEffect(() => {
  //   console.log("EchartsContaiterUI -> options", options)
  //   if (options) {
  //         echartsInit()
  //       }
  // }, [options])
  // }, [options]) 监听 options 不起效;原因未知 有空研究
  const echartsInit = () => {
    // 绘制图表
    
    var myChart = echarts.init(document.getElementById(id));
    // 接受 传过来的 options 设置
    myChart.setOption(options)
  }
  return (
    <div id={id} style={{ width: width, height: height }}></div>
  )
}