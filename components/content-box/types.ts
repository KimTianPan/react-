/**
 * 内容参数
 * @param headerOptions
 */
export type ContentOptions = {
  className?: string
  options: {
    headerOptions?: HeaderOptions
    bodyOptions: BodyOptions
  }

}

/**
 * 头部参数options
 * @param title 标题
 * @param level 标题层别
 * @param contentList 内容节点数组
 */
type HeaderOptions = {
  title?: string
  level?: number
  icon?: boolean
  border?: boolean
  actionList?:React.ReactNode[]
  contentList?: React.ReactNode[]
}

/**
 * 内容参数options
 * @param showPage 是否显示翻页
 * @param contentList 内容节点数组
 * @param page 翻页参数
 */
type BodyOptions = {
  contentList: React.ReactNode[]
}