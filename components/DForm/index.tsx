import 'babel-polyfill'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'jreap-core/dist/index.css'
import store, { reducer, initialState } from './store';
import { Form, Input, Icon, Row, Col, Button } from 'antd';
import findFormItem from './formUI';
import '@/common/custom.scss'
import { filtersObjectTrim } from '@/api/helper';
const Index: React.FC<any> = (props: any) => {
  /**
   * 使用配置说明
   * <DForm
   * submit={submit} // 非必填 如果没有传 submit 则 提交按钮隐藏
   * submitText={'提交'}
   * _children={<Table></Table>} // 非必填 配置子节点 接受 react 元素 
   * options 必传
   * options={[
                  {
                    key: 'userId', // 必填 后台对应接受字段
                    label: '下拉', // 非必填 label描述
                    formItemType: 'select', // 必填  formItem类型 支持类型 input,inputNumber,select,checkbox,datePicker,rangePiceker,textArea,text,upload,user,dict
                    icon: 'user', // 非必填 输入框或者选择框 前面的小图标
                    labelCol: 4, // 非必填  控制label大小 取值 0-24
                    wrapperCol: 20, // 非必填  控制输入框,下拉框大小 取值 0-24
                    colSpan: 6,// 非必填 控制当前 一个formItem 的宽度 取值 0-24
                    required: true, //非必填 表单验证 true 为验证 false不验证
                    placeholder: '下拉', //非必填 提示语
                    data: [ // 必填 select 数据源
                      { value: '1', name: 'he3he' }, { value: '2', name: 'he4he' }
                    ],
                    disabled:false,
                    labelInValue: false, // 非必填 boolean 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 {key: string, label: ReactNode} 的格式
                    value: '1', // 非必填 指定当前选中的条目
                    callback: {
                      // 非必填 移步至 官网 查看对应回调 https://3x.ant.design/docs/react/introduce-cn
                      onChange(e) {

                      },
                      onBlur(e) {
                      }
                    }
                  }
   * />
   */
  const [state, dispatch] = React.useReducer(reducer, (initialState as any))
  const { getFieldDecorator } = props.form;
  React.useEffect(() => {
  }, [])

  const formSubmit = () => {
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log("formSubmit -> values", values)
        // 发送请求
        props['submit'](filtersObjectTrim(values))
      }
    });
  }
  const setFormItemValue = (key, value) => {
    props.form.setFieldsValue({ [key]: value })
  }
  return (
    <store.Provider value={{ state, dispatch }} >
      {props.submit ?

        <div className="j-button-box" >
          <Button type="primary" onClick={formSubmit}>{props.submitText ? props.submitText : '保存'}</Button>
        </div> : ''
      }

      <Form  className="form-overflow-auto">
        <Row gutter={props['gutter'] || 16}>
          {props.options.map(key => {
            return <Col span={key['colSpan'] || 0}>
              <Form.Item label={key['label']} labelCol={{ span: key['labelCol'] || 0 }} wrapperCol={{ span: key['wrapperCol'] || 0 }}>
                {getFieldDecorator(key['key'],
                  {
                    initialValue: key['value'],
                    rules: [
                      {
                        required: key['required'] || false,
                        message: key['placeholder'] ? key['placeholder'] : `不能为空`,
                      },
                      {
                        validator: key['validator'] || null
                      }
                    ],
                  })(
                    findFormItem(key, key['callback'], setFormItemValue)
                  )}
              </Form.Item>
            </Col>
          })}
        </Row>
      </Form>
      {props._children}
    </store.Provider>
  )
}

const DForm = Form.create<any>({ name: 'd-form' })(Index);
export default DForm;