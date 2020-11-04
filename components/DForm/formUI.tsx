import React from "react";
import { Input, Icon, InputNumber, Select, Checkbox, DatePicker, Button } from "antd";
import moment from "moment";
import DTUpload from "../DTUpload";
import { Dict } from "jreap-leaf";
import { DTUser } from "../DTUser";
import TextArea from "antd/lib/input/TextArea";
const { Option } = Select;
const { RangePicker } = DatePicker;
export default function findFormItem(key: Object, callback: Function, setFormItemValue) {
  const [visible, setVisible] = React.useState(false)
  const onClose = () => {
    setVisible(false)
  }

  switch (key['formItemType']) {
    case 'input':
      return (
        <>

          <Input
            type={'text'}
            disabled={key['disabled']}
            prefix={key['icon'] ? <Icon type={key['icon']}
              style={{ color: 'rgba(0,0,0,.25)' }} /> : ''}
            placeholder={key['placeholder']}
            addonAfter={key['addonAfter']}
            value={key['value'] as any}
            minLength={key['minLength']}
            maxLength={key['maxLength']}
            onChange={(e) => { setFormItemValue(key['key'], e.target.value); callback ? callback['onChange'](e.target.value) : setFormItemValue(key['key'], e.target.value); console.log(e.target.value); }}
            onPressEnter={callback ? callback['onPressEnter'] : ''}
            allowClear={key['allowClear']}
          />
        </>);
    case 'inputNumber':
      key['value']
      return (
        <>
          <InputNumber
            disabled={key['disabled']}
            min={key['min']}
            max={key['max']}
            decimalSeparator={key['decimalSeparator']}
            value={key['value']}
            placeholder={key['placeholder']}
            onChange={(e) => { setFormItemValue(key['key'], e + ''); callback ? callback['onChange']( e ) : setFormItemValue(key['key'],  e + ''); console.log( e + ''); }}
            onPressEnter={callback ? callback['onPressEnter'] : ''}
            step={key['step']}
          />
        </>
      )
    case 'select':
      return <>
        <Select
          disabled={key['disabled']}
          showSearch={key['showSearch']}
          style={{ width: key['width'] }}
          labelInValue={key['labelInValue']}
          value={key['value']}
          defaultValue={key['defaultValue']}
          placeholder={key['placeholder']}
          optionFilterProp="children"
          onChange={(e) => { setFormItemValue(key['key'], e); callback ? callback['onChange'](e) : ''; }}
          onFocus={callback ? callback['onFocus'] : ""}
          onBlur={callback ? callback['onBlur'] : ""}
          onSearch={callback ? callback['onSearch'] : ''}
          filterOption={(input, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {key['data'].map(key => {
            return <Option key={key['value']} value={key['value']}>{key['name']}</Option>
          })}

        </Select></>
    case 'checkbox':
      return key['teype'] == 'croup' ?
        <> <Checkbox.Group disabled={key['disabled']} options={key['data']} defaultValue={[key['defaultValue']]} onChange={callback ? callback['onChange'] : ''} /></>
        :
        key['data'].length > 0 ?
          key['data'].map(item => {
            return <> <Checkbox defaultChecked={key['defaultChecked']} disabled={key['disabled']} onChange={callback ? callback['onChange'] : ''} > {item['name']}</Checkbox></>
          }) : ''
    case 'datePicker':

      return <><DatePicker
        disabled={key['disabled']}
        disabledDate={(currentDate: any) => {
          if (key['disabledDate']) {
            switch (key['disabledDate']['type']) {
              case '0': // 小于每个时间
                if (key['disabledDate']['endDisabledDate']) {
                  return currentDate && currentDate > moment(key['disabledDate']['endDisabledDate']).endOf('day')
                } else {
                  return false
                }
              case '1': // 大于某个时间
                if (key['disabledDate']['startDisabledDate']) {
                  return currentDate && currentDate < moment(key['disabledDate']['startDisabledDate']).endOf('day')
                } else {
                  return false
                }
              case '2':
                if (key['disabledDate']['endDisabledDate'] && key['disabledDate']['startDisabledDate']) {

                  return currentDate && moment(key['disabledDate']['endDisabledDate']).endOf('day') < currentDate || currentDate < moment(key['disabledDate']['startDisabledDate']).endOf('day')
                } else {
                  return false;
                }
              default:
                return currentDate
            }

          }

        }}
        showTime={key['dateFormat'] ? true : false}
        onChange={callback ? (value: any) => {
          callback['onChange'](moment(value).format(key['dateFormat'] ? key['dateFormat'] : 'YYYY-MM-DD'))
          setFormItemValue(key['key'], moment(value).format('YYYY-MM-DD'))
        } : (e: any) => setFormItemValue(key['key'], moment(e).format('YYYY-MM-DD'))}
        value={key['value'] ? moment(key['value'], key['dateFormat'] ? key['dateFormat'] : 'YYYY-MM-DD') : undefined}

      /></>

    case 'rangePicker':
      return (
        <> <RangePicker
          disabled={key['disabled']}
          showTime={key['dateFormat'] ? true : false}
          onChange={callback ? callback['onChange'] : ''}
          value={[moment(key['startTime'], key['dateFormat'] ? key['dateFormat'] : 'YYYY-MM-DD'),
          moment(key['endTime'], key['dateFormat'] ? key['dateFormat'] : 'YYYY-MM-DD')]}
          format={key['dateFormat'] ? key['dateFormat'] : 'YYYY-MM-DD'}
        /></>
      )
    case 'textArea':
      return (
        <> <TextArea
          disabled={key['disabled']}
          autoSize={{ minRows: key['minRows'] || 3, maxRows: key['maxRows'] || 5 }}
          placeholder={key['placeholder']}
          onBlur={callback ? callback['onBlur'] : ''} /></>
      )
    case 'text':
      return (
        <>
          <div className="bottom-solid">{key['value']}</div>
        </>
      )
    case 'button':
      return (
        <>
          <Button type={key['type'] || 'primary'} onClick={callback ? callback['onClick'] : ''}>{key['text']}</Button>
        </>
      )
    case 'upload':
      // 自定义上传图片
      return (
        <> <DTUpload
          disabled={key['disabled']}
          listType={key['listType']}
          defaultFileList={key['defaultFileList']}
          uploadText={key['uploadText']}
          multiple={key['multiple']}
          maximum={key['maximum']}
          accept={key['accept']}
          maxFileList={[key['maxFileList']]}
          url={key['url']}
          downloadIcon={key['downloadIcon']}
          showButton={key['showButton']}
          onUpload={(value) => {
            setFormItemValue(key['key'], value.length > 0 ? value.join(',') : undefined); callback ? callback['onUpload'](value) : '';
          }

          }
        ></DTUpload></>
      )
    case 'user':
      // 自定义选人
      return (
        <>
          <DTUser visible={visible} isSingle={key['isSingle']} onClose={onClose} onSumbit={(value) => {
            onClose();
            if (key['isSingle']) {
              setFormItemValue(key['key'], value[0].name)
            } else {
              setFormItemValue(key['key'], key['value'] + ',' + value[0].name)
            }
            callback ? callback['onSubmit'](value) : ''
          }}></DTUser>
          <Input placeholder={key['placeholder']} value={key['value']} onFocus={(e) => {
            setVisible(true)
          }} />

        </>
      )
    case 'dict':
      return (
        <> <Dict options={{
          dataSource: {   // 数据源
            read: {
              url: '/base/web/code/getCodeTree.form', //请求url(必填)
              data: {
                mark: key['mark'], //字典编码标识(必填)
                showChild: key['showChild'] || true, // 是否显示子节点
                bizId: '',
                isNeedPublicValue: '',
                type: ''
              }
            }
          },
          treeData: [],   // 树数据
          dataTextField: "name",  // 显示名称对应的key，当使用dataSource数据源时为必填
          dataValueField: "mark",// 显示id对应的key，当使用dataSource数据源时为必填
          dataChildrenField: "items",// 下级树对应的key，当使用dataSource数据源时为必填
          disabled: false,    //是否可使用
          treeDefaultExpandAll: false,    //默认是否全展开
          treeDefaultExpandedKeys: [],    //默认展开的树节点，key值组
          placeholder: '请选择业务类型',  //默认提示信息
          style: {    //选择框的宽
            width: key['width'] || 200
          },
          dropdownStyle: { //下拉框的最大高
            maxHeight: key['maxHeight'] || 400
          }
        }}
          value={key['value']}
          onSelect={(value: string, node: any, extra: any) => { callback ? callback['onSelect'] : '' }}
          onChange={(value: string, label: string[], extra: any) => { callback ? callback['onChange'] : '' }}
          onTreeExpand={(expandedKeys: string[]) => { callback ? callback['onTreeExpand'] : '' }}
        /></>
      )
    default:
      return ''
  }
}