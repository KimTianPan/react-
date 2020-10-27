import 'babel-polyfill'
import * as React from 'react';
import { Spin } from 'antd';
import ReactDOM from 'react-dom';
import './index.scss'

function Loading(flag) {
  let dom = document.querySelector('#root') as any
  if (flag) {
    var div = document.createElement('div')
    div.className = 'spin-show'
    dom.appendChild(div)
    ReactDOM.render(
      <Spin size="large" />,
      div
    );
  } else {
    let div = document.querySelector('.spin-show') as any
    dom.removeChild(div)
  }


}
export default Loading