
import * as React from 'react';
import 'antd/dist/antd.css';
import 'jreap-core/dist/index.css'
import './DTInput.scss'
import { Input, Form, InputNumber } from 'antd';
export class DTInput extends React.Component<any> {
  input: Input | null;
  /**
 * 使用手册
 * 在所需页面 导入 DTInput 组件
 * 使用示例 <DTInput  />
 * 使用示例保留2位小数 <DTInput expectedReturnValue='2'  />
 * expectedReturnValue 组件返回值  
 * 不传任意输入,
 * 传 0 输入0-9,
 * 传 1 输入1-9
 * 传 2 保留2位小数,传3 保留3位小数
 * 传入 inputNumber 显示数字化输入框 <DTInput inputNumber ></DTInput>
 */
  constructor(props) {
    super(props);
  }

  state = {
    addonAfter: '',//	带标签的 input，设置后置标签	string| ReactNode
    addonBefore: '',//	带标签的 input，设置前置标签	string | ReactNode
    defaultValue: undefined,	//输入框默认内容	string
    disabled: false,//是否禁用状态，默认为 false	boolean	false
    id: '',//	输入框的 id	string
    maxLength: 9999,//	最大长度	number
    prefix: '',//带有前缀图标的 input	string | ReactNode
    size: '' as any,//	控件大小。注：标准表单内的输入框大小限制为 large。可选 large default small	string	default
    suffix: '',//	带有后缀图标的 input	string | ReactNode
    type: '',// 声明 input 类型，同原生 input 标签的 type 属性，见：MDN(请直接使用 Input.TextArea 代替 type = "textarea") 。	string	text
    value: this.props.value,//	输入框内容	string
    onChange: '',//	输入框内容变化时的回调	function(e)		3.9.3
    onPressEnter: '',//	按下回车的回调	function(e)
    allowClear: false,//可以点击清除图标删除内容	boolean
    expectedReturnValue: "",
    placeholder: '',
    inputNumber: false,
    max: 0,
    min: 0,
  }
  static getDerivedStateFromProps(nextProps, privateProps) {
    return {
      addonAfter: nextProps.addonAfter,//	带标签的 input，设置后置标签	string| ReactNode
      addonBefore: nextProps.addonBefore,//	带标签的 input，设置前置标签	string | ReactNode
      defaultValue: nextProps.defaultValue,	//输入框默认内容	string
      disabled: nextProps.disabled,//是否禁用状态，默认为 false	boolean	false
      id: nextProps.nextProps,//	输入框的 id	string
      maxLength: nextProps.maxLength,//	最大长度	number
      prefix: nextProps.prefix,//带有前缀图标的 input	string | ReactNode
      size: nextProps.size,//	控件大小。注：标准表单内的输入框大小限制为 large。可选 large default small	string	default
      suffix: nextProps.suffix,//	带有后缀图标的 input	string | ReactNode
      type: nextProps.type,// 声明 input 类型，同原生 input 标签的 type 属性，见：MDN(请直接使用 Input.TextArea 代替 type = "textarea") 。	string	text
      onChange: nextProps.onChange,//	输入框内容变化时的回调	function(e)		3.9.3
      onPressEnter: nextProps.onPressEnter,//	按下回车的回调	function(e)
      allowClear: nextProps.allowClear,//可以点击清除图标删除内容	boolean
      expectedReturnValue: nextProps.expectedReturnValue,
      placeholder: nextProps.placeholder,
      value: nextProps.value,
      inputNumber: nextProps.inputNumber,
      max: nextProps.max ? nextProps.max : 9999999999,
      min: nextProps.min ? nextProps.min : -9999999999,
    }
  }
  componentDidMount() {
    this.input?.focus()
    console.log("DTInput -> componentDidMount -> this.props.ref", this.props)
    // this.props.ref ? this.props.ref.focus() : ''
  }
  onChange = (value) => {
    console.log("DTInput -> onChange -> e", value)
    let filterValue = ''
    switch (this.state.expectedReturnValue) {
      case '0':
        filterValue = value.replace(/[^0-9]/g, '')
        value = filterValue
        this.setState(
          {
            value: filterValue
          }
        )
        this.props.onChange(value);
        return;
      case '1':
        filterValue = value.replace(/[^1-9]/g, '')
        value = filterValue
        this.setState(
          {
            value: filterValue
          }
        )
        this.props.onChange(value);
        return;
      case '2':
        filterValue = value.replace(/[^\d.]/g, "")
          .replace(/^0\d+|^\./g, "")
          .replace(/\.{2,}/g, ".")
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".")
          .replace(/^(\d+)\.(\d\d).*$/, "$1.$2")
        value = filterValue
        this.setState(
          {
            value: filterValue
          }
        )
        this.props.onChange(value);
        return;
      case '3':
        filterValue = value.replace(/[^\d.]/g, "")
          .replace(/^0\d+|^\./g, "")
          .replace(/\.{3,}/g, ".")
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".")
          .replace(/^(\d+)\.(\d\d\d).*$/, "$1.$2")
        value = filterValue
        this.setState(
          {
            value: filterValue
          }
        )

        this.props.onChange(value);
        return;
      default:
        this.setState({
          value: value
        })
    }

    this.props.onChange(value);

  }
  onPressEnter = (e) => {
    if (this.props.onPressEnter) {
      this.props.onPressEnter(e)
    }
  }
  onBlur = (e) => {
    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }
  onFocus = (e) => {
  }
  focus = () => { }
  render() {
    return (
      this.state.inputNumber ? <InputNumber
        // addonAfter={this.state.addonAfter}//	带标签的 input，设置后置标签	string| ReactNode
        // addonBefore={this.state.addonBefore}//	带标签的 input，设置前置标签	string | ReactNode
        max={this.state.max}
        min={this.state.min}
        defaultValue={this.state.defaultValue}	//输入框默认内容	string
        disabled={this.state.disabled}//是否禁用状态，默认为 false	boolean	false
        id={this.state.id}//	输入框的 id	string
        prefix={this.state.prefix}//带有前缀图标的 input	string | ReactNode
        size={this.state.size}//	控件大小。注：标准表单内的输入框大小限制为 large。可选 large default small	string	default
        // suffix={this.state.suffix}//	带有后缀图标的 input	string | ReactNode
        type={this.state.type}// 声明 input 类型，同原生 input 标签的 type 属性，见：MDN(请直接使用 Input.TextArea 代替 type = "textarea") 。	string	text
        value={this.state.value}//	输入框内容	string
        onChange={(e) => { this.onChange(e) }}//	输入框内容变化时的回调	function(e)		3.9.3
        onPressEnter={this.onPressEnter}//	按下回车的回调	function(e)
        // allowClear={this.state.allowClear}//可以点击清除图标删除内容	boolean
        placeholder={this.state.placeholder}
        onBlur={this.onBlur}
      // ref={node => (this.input = node)}
      ></InputNumber> :
        <Input
          addonAfter={this.state.addonAfter}//	带标签的 input，设置后置标签	string| ReactNode
          addonBefore={this.state.addonBefore}//	带标签的 input，设置前置标签	string | ReactNode
          defaultValue={this.state.defaultValue}	//输入框默认内容	string
          disabled={this.state.disabled}//是否禁用状态，默认为 false	boolean	false
          id={this.state.id}//	输入框的 id	string
          maxLength={this.state.maxLength}//	最大长度	number
          prefix={this.state.prefix}//带有前缀图标的 input	string | ReactNode
          size={this.state.size}//	控件大小。注：标准表单内的输入框大小限制为 large。可选 large default small	string	default
          suffix={this.state.suffix}//	带有后缀图标的 input	string | ReactNode
          type={this.state.type}// 声明 input 类型，同原生 input 标签的 type 属性，见：MDN(请直接使用 Input.TextArea 代替 type = "textarea") 。	string	text
          value={this.state.value}//	输入框内容	string
          onChange={(e) => { this.onChange(e.target.value) }}//	输入框内容变化时的回调	function(e)		3.9.3
          onPressEnter={this.onPressEnter}//	按下回车的回调	function(e)
          allowClear={this.state.allowClear}//可以点击清除图标删除内容	boolean
          placeholder={this.state.placeholder}
          onBlur={this.onBlur}
          ref={node => (this.input = node)}
        ></Input>

    )
  }
}
