import * as React from 'react'
import store from './store'
import './index.scss'
/**
 * 内容控件 - 视图
 */
const ContentBoxUI: React.FC<any> = (props) => {
  const { state, dispatch } = React.useContext(store);
  const { headerOptions, bodyOptions, className } = state
  let titleHtml: React.ReactNode

  // 标题级别不同，不同的样式处理
  if (headerOptions && headerOptions.title) {
    if (headerOptions.level == 2) {
      titleHtml = <h3>{headerOptions.icon ? ContentIcon(headerOptions.icon) : ''}{headerOptions.title}</h3>
    } else if (headerOptions.level == 3) {
      titleHtml = <h4>{headerOptions.icon ? ContentIcon(headerOptions.icon) : ''}{headerOptions.title}</h4>
    } else {
      titleHtml = <h2>{headerOptions.icon ? ContentIcon(headerOptions.icon) : ''}{headerOptions.title}</h2>
    }
  } else {
    titleHtml = null
  }


  return (
    <div className={headerOptions && headerOptions.level == 3 ? `${className} container content container-level3` : `${className} container content`}>
      {
        headerOptions ?
          <header className={headerOptions.border ? 'container-header j-clear content-box container-header-boder' : 'container-header j-clear content-box'}>
            {titleHtml}
            {ContentUI(headerOptions.actionList, 'action')}
            {ContentUI(headerOptions.contentList, 'header')}
          </header> : ''

      }
      {bodyOptions ?
        <article className="container-body j-clear">
          {ContentUI(bodyOptions.contentList, 'container')}
        </article> : ''
      }

    </div>
  )
}

// 遍历渲染
const ContentUI: React.FC<React.ReactNode[]> = (list, el) => {

  return <div className={`container-${el}-list j-clear`}>
    {
      list && list.length > 0 ?
        list.map((items: any, index: number) => {
          return <div className="container-list-items" key={index}>{items}</div>
        }) : ''
    }
  </div>
}
// 渲染titlet图标
const ContentIcon: React.FC<React.ReactNode[]> = (item, el) => {
  return item ? <span className="icon-font" >{item}</span> : <span></span>

}

export default ContentBoxUI;