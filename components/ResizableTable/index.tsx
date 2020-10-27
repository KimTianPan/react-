import { Table, Pagination, Tooltip, Popconfirm } from 'antd';
import { Resizable } from 'react-resizable';
import React = require('react');
import './index.scss'
import { PAGES } from '@/common/types';
import store from '@/common/store';
const qs = require('qs')
const _join = require('loadsh')
const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  )
}

export class ResizableTable extends React.Component<any>{
  /**
   * 
   * @param props  父组件传入初始数据
   * dataIndex 传入合计显示位置, 默认为 序号(index) 位置
   *  totalNum : {} 传入合计 字段名称  父组件传入例子 <ResizableTable totalNum={{key:0}} /> 
   * 可以传多个 key 值计算  <ResizableTable totalNum={{key1:0,key2:0}} /> 
   *  onlyKey 标识唯一 属性; 一般用于选中当前行标识(有的数据没有ID)
  
   *   showNumber 配置序号是否显示 默认显示 ,  <ReaizableTable showNumber={false}/> 不显示序号
   * 
   * 添加默认排序 配置 sorter 默认显示排序true, 
   * <ReaizableTable sorterOption={{sorter:false}} /> 不显示排序   
   * <ReaizableTable sorterOption={{sorter:true,name:[table列名,'aaa','bbb']}}/> 自定义排序 字段 
   *   集成排序分页使用
   *  参数 pagination 默认 true (使用默认值, total 为必传字段,传当前列表接口返回总条数)
   *  callbackEditCol 当列表有编辑 列的时候 传入回调函数
   *  callbackEditCol={(record, col) => {
                  return {
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                    dataSource: this.state.dataSource,
                    currentIdNull: this.currentIdNull
                  }
                }}
   * columnsType={'ShipCoalInOut'} // 传入columns 数据类型  必转
   * action={ Boolenan}  // 传入是否显示 操作按钮
   * showDrawer={this.showDrawer}    操作按钮 回调
   * 
   * onChange={(page)=>{
   *  
   * }}
   *  配置 序号跟操作按钮是否固定 
   *  left  设置为true 固定序号列 
   *  right 设置为true 固定操作列 width 设置操作列宽度
   *  fixed={
                  { left: true, right: true, width: 100 }
            }
   * dataSource数据源中的 action 对象设置 show true  显示可操作,false 则至灰
   * data.data.rows.map((key, index) => {
            (key as any).action = [
              {
                name: '匹配计划',
                type: 'plan',
                popconfirm: true,
                icon: 'iconfont iconpipei',
                title: '选择来煤计划',
                id: key.id,
                show: key.state == '1' ? true : false,
              },
              {
                name: '出港登记',
                type: 'out',
                popconfirm: true,
                icon: 'iconfont iconchugangdengji',
                title: '出港登记',
                id: key.id,
                show: key.state == '4' && key.state != '6' ? true : false,
              },
              {
                name: '编辑',
                type: 'update',
                icon: 'iconfont iconk-i-edit1',
                title: '编辑',
                id: key.id,
                show: key.state == '1' ? true : false,
              },
              {
                name: '删除',
                type: 'delete',
                icon: 'iconfont iconk-i-delete',
                title: '删除',
                id: key.id,
                show: key.state == '2' ? true : false,
              },
            ]
          })
   */
  constructor(props) {
    super(props);

  }
  state = {
    flag: true,
    columns: this.props.columns || [],
    action: false,
    dataSource: [] as any,
    bordered: '',
    scroll: {},
    pagination: true,
    rowClassName: '' as any,
    tableId: '',
    components: '' as any,
    key: '',
    expandedRowRender: '' as any,
    showHeader: true,
    className: '',
    total: 0,
    page: 1,
    pageSize: 10,
    totalNum: {} as any,
    dataIndex: '',
    heiji: true,
    antiShake: true,// 设置分页 序号防抖 
    showNumber: true,//  设置序号显示 默认显示 如需不显示序号 设置 false
    sorter: '',
    privateSorter: '' as any,
    sorterName: [] as any,
    orders: [] as any,
    expandIconColumnIndex: 1,
    expandRowByClick: false,
    filters: [],
    rowSelection: new Object(),
    fixed: {} as any,
    // data: this.props.data ? this.props.data : {
    //   rows: [],
    //   page: {
    //     current: 1,
    //     total: 0,
    //     totalpages: 0
    //   }
    // } as any,
    data: {
      page: {
        current: 1
      }
    } as any,
    loading: false,
    footer: '' as any,
    dataLength: ''
  };

  components = {
    header: {
      cell: ResizeableTitle,
    },
  }

  static getDerivedStateFromProps(nextProps, privateProps) {
    // if (nextProps.data) {
    //   nextProps.data.page.current = Number(nextProps.data.page.current) + 1
    // }
    return {
      dataSource: nextProps.dataSource,
      data: nextProps.data ? nextProps.data : {
        rows: [],
        page: {
          current: 1,
          total: 0,
          totalpages: 0
        }
      },
      dataLength: nextProps.data ? nextProps.data.rows.length : '',
      // columns: nextProps.columns,
      bordered: nextProps.bordered,
      scroll: nextProps.scroll,
      pagination: nextProps.pagination === false ? nextProps.pagination : true,
      rowClassName: nextProps.rowClassName,
      components: nextProps.components ? JSON.parse(JSON.stringify(nextProps.components)) : '',
      key: nextProps.onlyKey || 'id',
      expandedRowRender: nextProps.expandedRowRender || '',
      showHeader: nextProps.showHeader,
      className: nextProps.className,
      totalNum: nextProps.totalNum,
      dataIndex: nextProps.dataIndex,
      antiShake: privateProps.antiShake,
      showNumber: nextProps.showNumber === false ? nextProps.showNumber : true,
      sorter: nextProps.sorterOption ? nextProps.sorterOption.sorter : true,
      sorterName: nextProps.sorterOption ? nextProps.sorterOption.name : [] as any,
      privateSorter: nextProps.privateSorter ? nextProps.privateSorter : {} as any,
      expandIconColumnIndex: nextProps.expandIconColumnIndex,
      expandRowByClick: nextProps.expandRowByClick,
      rowSelection: nextProps.rowSelection ? nextProps.rowSelection : null,
      fixed: nextProps.fixed ? nextProps.fixed : {},
      action: nextProps.action === true ? true : false,
      tableId: nextProps.tableId ? nextProps.tableId : privateProps.tableId,
      filters: nextProps.paramsFilters ? nextProps.paramsFilters : [],
      loading: nextProps.loading,
      footer: nextProps.footer
    }
  }
  componentDidMount() {
    // this.context.dispatch({
    //   type: PAGES,
    //   value: {
    //     page: 1,
    //     pageSize: 10,
    //   }
    // })

  }

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }: any) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  setRowClassName = (row) => {
    const { tableId } = this.state;
    return row[this.state.key] === tableId ? `click-row-style` : '';
  }
  actionClick = (value, row) => {
    this.props.tableId ? "" : this.setState({ tableId: row[this.state.key] });
    this.props.showDrawer ? this.props.showDrawer(value, row) : ''
  }
  actionRender = (action: any[], record: any, index) => {
    return action
      ? action.map((value, index) => {
        return value.show ? (
          value.popconfirm ? (
            <Tooltip
              placement="topLeft"
              title={value.name}
              arrowPointAtCenter
            >
              <Popconfirm
                title={`是否${value.name}`}
                onConfirm={() => {
                  this.actionClick(value, record)
                }}
              >
                <a
                  className={value.icon}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                ></a>
              </Popconfirm>
            </Tooltip>
          ) : (
              <Tooltip
                placement="topLeft"
                title={value.name}
                arrowPointAtCenter
              >
                <a
                  className={value.icon}
                  onClick={(e) => {
                    e.stopPropagation()
                    this.actionClick(value, record)
                  }}
                ></a>
              </Tooltip>
            )
        ) : (
            <Tooltip placement="topLeft" title={value.name} arrowPointAtCenter>
              <a className={value.icon + ' action-button-disabled'}></a>
            </Tooltip>
          )
      })
      : ''
  }
  render() {
    /**
     * 配置序号
     */
    if (!!this.state.showNumber && this.state.columns.length > 0) {
      if (this.state.columns[0].dataIndex != 'index') {
        if (this.state.fixed.left) {
          this.state.columns.unshift({
            title: '序号',
            dataIndex: 'index',
            align: 'center',
            width: this.state.fixed.indexWidth ? this.state.fixed.indexWidth : 50,
            fixed: 'left'
          })
        } else {
          this.state.columns.unshift({
            title: '序号',
            dataIndex: 'index',
            align: 'center',
            width: this.state.fixed.indexWidth ? this.state.fixed.indexWidth : 50
          })
        }

      }
      //   // 设置分页防抖判断
      // if (this.state.antiShake) {
      // 添加序号 
      if (this.state.data.rows) {
        this.state.data.rows.map((key, value) => {
          // key.index = key.index != '合计' ? (this.state.data.page.current) * 10 + value + 1 : '合计' // 有合计的时候避免把合计给覆盖
          if (this.state.data.page) {
            this.state.data.page.current < 0 ? this.state.data.page.current = 0 : this.state.data.page.current
            key.index = (this.state.data.page.current) * this.state.pageSize + value + 1
          } else {
            key.index = value + 1
          }
        })
      }

      // }
    }
    /**
    * 设置操作按钮
    */
    if (!!this.state.action) {
      let isAction = this.state.columns.find((key) => {
        return key.dataIndex === 'action'
      })
      if (!isAction) {
        if (this.state.fixed.right) {
          this.state.columns.push({
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            fixed: 'right',
            width: this.state.fixed.width || undefined,
            render: this.actionRender,
          })
        } else {
          this.state.columns.push({
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            width: this.state.fixed.width || undefined,
            render: this.actionRender,
          })
        }
      }
    }

    // 合计需求未确定 这种呈现方式 不宜用 暂且注释
    // if (this.state.totalNum) {
    //   // if (!this.state.expandedRowRender) {
    //   //   nextProps = JSON.parse(JSON.stringify(nextProps))
    //   // }
    //   let flag = true
    //   let dataSource = _join.cloneDeep(this.state.data.rows)
    //   dataSource.map((key, index) => {

    //     for (var i in this.state.totalNum || {}) {
    //       // this.state.totalNum[i] = 0;
    //       if(index<dataSource.length){
    //         this.state.totalNum[i] = (Number(key[i] * 100) + Number(this.state.totalNum[i]) * 100) / 100;
    //         if (this.state.dataIndex) {
    //           this.state.totalNum[this.state.dataIndex] = ''; //合计
    //         } else {
    //           this.state.totalNum.index = ''; // 合计
    //         }
    //       }

    //     }

    //   })

    //   if (this.state.data.rows.length >= 1) {
    //     this.state.data.rows.map(key => {
    //       if (!key.id) {
    //         // if (key.index == '合计' || key[this.state.dataIndex] == '合计') {
    //         this.state.data.rows.splice(this.state.data.rows.length - 1, 1)
    //       }
    //     })
    //     this.state.antiShake = true
    //     // if (this.state.dataLength  == this.state.data.rows.length) {
    //     // this.setState({ flag: false })
    //     this.state.data.rows.splice(this.state.data.rows.length, 0, this.state.totalNum);
    //     // }
    //   }
    // }


    // 设置分页防抖
    if (this.state.data.rows && this.state.data.rows.length >= 1 && JSON.stringify(this.state.data.rows) != JSON.stringify(this.state.data.rows)) {
      // 当外部传入 数据源大于 并且 不跟上一个数据相等 
      this.state.antiShake = true
    }
    const columns = this.state.columns.map((col, index) => {
      // 煤场入炉查询 特殊 table 删除使用
      // if (this.props.columnsType == 'CoalYardOutStockQuery') {
      //   if (this.state.data.rows) {
      //     this.state.data.rows.map((key, value) => {
      //       for (let i in key) {
      //         if (i == col.dataIndex && !key[i]) {
      //           this.state.columns.splice(index, 1)
      //           this.setState({ columns: this.state.columns })
      //         }
      //       }
      //     })
      //   }
      // }


      /**
       * 配置排序
       */
      if (this.state.sorter) {
        /**
         * 配置自定义字段排序 传字段名称就排哪个
         */
        if (this.state.sorterName.length >= 1) {
          this.state.sorterName.map(key => {
            col.dataIndex == key ? col.sorter = true : ''
          })
        } else {
          if (col.dataIndex !== 'index' && col.dataIndex !== 'action' && col.dataIndex !== 'state') {
            col.sorter = true;
          }
        }

      }
      return (
        {
          ...col,
          onHeaderCell: column => ({
            width: column.width,
            onResize: this.handleResize(index),
          }),
          onCell: record => (this.props.callbackEditCol ? this.props.callbackEditCol(record, col) : null)
        }
      )
    });

    this.components = Object.assign(this.components, this.props.components ? this.props.components : {})

    // const pagination = this.state.pagination ?
    //   {
    //     current: this.state.data.page.current ? Number(this.state.data.page.current) + 1 : 0,
    //     pageSize: this.state.pageSize,
    //     pageSizeOptions: [10, 30, 50, 100],
    //     showQuickJumper: true,
    //     showSizeChanger: true,
    //     total: this.state.data.page.total,
    //     showTotal: (total, range) => {
    //       return `总共${this.state.data.page.total}条`
    //     }
    //   } as any
    //   : false
    const { privateSorter } = this.state
    return <div >
      <Table
        scroll={this.state.scroll}
        bordered={this.state.bordered ? true : false}
        components={this.components}
        columns={columns}
        dataSource={this.state.data.rows}
        rowClassName={this.setRowClassName}
        rowSelection={this.state.rowSelection}
        pagination={false}
        loading={this.state.loading}
        expandedRowRender={this.state.expandedRowRender}
        expandRowByClick={this.state.expandRowByClick}
        expandIconColumnIndex={this.state.expandIconColumnIndex}
        onExpand={(expanded, record) => {
          this.props.onExpand ? this.props.onExpand(expanded, record) : ''
        }}
        footer={this.state.footer}
        showHeader={this.state.showHeader}
        className={this.state.className}
        onChange={(pagination: any, filters, sorter, extra: { currentDataSource: [] }) => {
          //  设置排序
          this.setState({ privateSorter: sorter }) // 设置排序
          this.props.onChange ? this.props.onChange({
            page: this.state.page,
            pageSize: this.state.pageSize,
            orders: [
              JSON.stringify(sorter) === '{}'
                ? undefined
                : {
                  desc: sorter.order === 'ascend' ? true : false,
                  property: sorter.field,
                },
            ],
            filters: this.state.filters
          }) : ''

        }}


        onRow={(record: any) => {
          return {
            onClick: event => {
              if (this.props.children) {
                this.props.children[1](record, event)
              }
              // 行点击变色,设置唯一的 key
              this.props.tableId ? "" : this.setState({ tableId: record[this.state.key] });
              // 暴露 行点击时间
              this.props.onClick ? this.props.onClick(record, event) : ''
            }, // 点击行
            onDoubleClick: event => { },
            onContextMenu: event => { },
            onMouseEnter: event => { }, // 鼠标移入行
            onMouseLeave: event => { },
          };
        }}
      />
      {/* 设置分页 */}
      {this.state.pagination ?

        <Pagination
          onShowSizeChange={(current, size) => {
            this.props.handlerPageSize ? this.props.handlerPageSize(size) : '';
            this.props.handlerChildPageChange ?
              this.props.handlerChildPageChange(current, size, [{
                desc: privateSorter.order === 'ascend' ? true : false,
                property: privateSorter.field,

              }]) : '';
            this.props.onChange ? this.props.onChange({
              page: current,
              pageSize: size,
              orders: [
                JSON.stringify(privateSorter) == '{}' ? undefined
                  : {
                    desc: privateSorter.order === 'ascend' ? true : false,
                    property: privateSorter.field,
                  },
              ],
              filters: this.state.filters

            }) : ''
            this.setState({
              page: current,
              pageSize: size,
              antiShake: false,
            })
          }}
          onChange={(page, pageSize) => {
            this.props.handlerChildPageChange
              ?
              this.props.handlerChildPageChange(
                page,
                pageSize,
                [{
                  desc: privateSorter.order === 'ascend' ?
                    true
                    : false,
                  property: privateSorter.field,
                }])
              : '';
            this.props.onChange ? this.props.onChange({
              page: page,
              pageSize: pageSize,
              orders: [
                JSON.stringify(privateSorter) == '{}' ? undefined
                  : {
                    desc: privateSorter.order === 'ascend' ? true : false,
                    property: privateSorter.field,
                  },
              ],
              filters: this.state.filters

            }) : ''
            this.setState({
              // page: this.state.data.page.current || this.state.data.page.current == '0' ? this.state.data.page.current : 0,
              page: page,
              pageSize: pageSize,
              antiShake: false,
            })
          }}
          pageSizeOptions={['10', '30', '50', '100']}
          current={this.state.data.page.current ? Number(this.state.data.page.current) + 1 : 0}
          pageSize={this.state.pageSize}
          showQuickJumper={false}
          showSizeChanger={true}
          total={this.state.data.page.total}
          showTotal={(total, range) => {
            return `总共${this.state.data.page.total}条`
          }}
        /> : ''
      }

    </div>;
  }
}
ResizableTable.contextType = store