import * as React from 'react';
import 'antd/dist/antd.css';
import { Drawer } from 'antd';
import JReap from 'jreap-core'
import { LookUP } from 'jreap-leaf'
export class DTUser extends React.Component<any> {
  constructor(props) {
    super(props);
  }

  state = {
    visible: false,
    options: {
      tree: {
        dataSource: {
          read: {
            headers: {   // 定义头部信息，content-type 必须全小写，默认为application/x-www-form-urlencoded
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            url: JReap.jreapProj + "web/right/util/findOrgTree.form",
            data: {
              isUnit: 1,
            }
          },
          search: {
            // 页面中的数据使用的是模拟接口，只接受参数为 name: '信息中心'、name: '制度委员会'
            /** 返回的数据结构：
            {
                "version": null,
                "flag": "success",
                "status": "",
                "error": "",
                "message": "",
                "attribute": null,
                "data": {
                    "rows": [],
                    "result": {
                        "expandId": [   // 被选中的树节点的所有父级节点ID数组集合
                            "40288d904815e0eb014815f869ef0007"  
                        ],
                        "selectId": [ // 选中的树节点ID数组集合
                            "f2ec04db-f51d-45dc-93e9-4cd07cf3cc12"
                        ]
                    },
                    "page": {
                        "current": "-1",
                        "totalpages": "7",
                        "total": "7"
                    }
                }
            }
            **/
            url: 'http://114.116.23.87:8222/mock/95/jreap/web/right/util/searchAccountList.form',
            // 筛选参数名称，模拟数据仅接受：name: '办公室'、name: '信息中心'、name: '制度委员会'，只返回部分信息
            filedname: "name"
          }
        },
        dataTextField: "name",
        dataValueField: "id",
        hasSearch: true    // 树是否可查询
      },
      listCard: {
        isSingle: this.props.isSingle ? this.props.isSingle : false,
        dataTextField: "name",
        dataImageUrlField: "IMG",
        defaultImageUrl: "images/man.png",  // 设置列表中显示图片的默认地址
        dataSource: {
          read: {
            headers: {   // 定义头部信息，content-type 必须全小写，默认为application/x-www-form-urlencoded
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            url: JReap.jreapProj + "web/right/util/searchAccountList.form",
            data: {
              pageSize: 15,
              type: 0,
              showNoOrganUser: 0,
              organFilter: true,
              take: 10,
              skip: 0,
              page: 1,
              parentId: '',
              onlySelf: 0
            }
          },
          hasSearch: true,    // 列表是否可查询
          searchOptions: {    // 查询控件参数
            formList: [
              {
                type: 'inputText',
                name: 'keyword',
                showLabel: true,
                placeholder: '请输入名称',
                style: {
                  width: 160
                }
              },
            ]
          },
          datanodeIdName: 'orgId',
        }
      },
      hasSumbit: true,
      hasTree: true
    }
  };
  static getDerivedStateFromProps(nextProps, privateProps) {
    return {
      visible: nextProps.visible
    }
  }
  componentDidMount() {
  }

  onClose = () => {
    this.props.onClose()
  };
  onSumbit(value: object[]) {
    this.props.onSumbit(value)
  }

  render() {
    return (
      <Drawer
        title="人员选择"
        placement="right"
        onClose={this.onClose}
        destroyOnClose={true}
        closable={false}
        maskClosable={true}
        width="70%"
        visible={this.state.visible}
      >
        <LookUP
          options={this.state.options}
          onSumbit={this.onSumbit.bind(this)}
        />
      </Drawer>
    )
  }
}
