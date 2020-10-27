import * as React from 'react'
import { DatePicker, Button, Form, Row } from 'antd'
import store from './../store'
import { SELECT_RANGES, SET_RANGES_BTN, SET_ELMOPTIONS } from './../actionsType'
import './Date_range_ui.scss'
import moment from 'moment'
const { RangePicker } = DatePicker
const ButtonGroup = Button.Group
const DateRangeContent: React.FC<any> = (props: any) => {
  const { state, dispatch } = React.useContext(store)
  const { getFieldDecorator, isFieldTouched, getFieldValue, setFieldsValue } = props.form
  const { defaultValue, showRangesBtn, rangeButtons } = state
  const [buttonArray, setButtonArray] = React.useState([])
  React.useLayoutEffect(() => { setButtonArray(rangeButtons) }, [rangeButtons])
  const rangesData = {}
  if (rangeButtons && rangeButtons.length > 0) {
    rangeButtons.map(item => {
      rangesData[item.text] = item.defaultValue
    })
  }

  const handlerClick = (_event) => {
    dispatch({
      type: SELECT_RANGES,
      value: {
        rangesText: _event.target.getAttribute('data-key')
      }
    })
  }
  React.useEffect(() => {
    if (defaultValue.length > 0) {
      setFieldsValue({
        'ranges': defaultValue
      })
    }
  }, [defaultValue])
  React.useEffect(() => {
    if (getFieldValue('ranges') !== undefined && getFieldValue('ranges').length > 0) {

      if (state.showRangesBtn) btnActivied(getFieldValue('ranges'))

    }
  }, [getFieldValue('ranges')])
  const btnActivied = (_value) => {
    const [startDate, endDate] = _value
    setButtonArray(buttonArray => {
      buttonArray.map((item: any, index) => {
        const [itemStartDate, itemEndDate] = item.defaultValue
        if (startDate.isSame(itemStartDate, 'day') && endDate.isSame(itemEndDate, 'day')) {
          item.actived = true
        } else {
          item.actived = false
        }
      })
      return [...buttonArray]
    })
  }
  const handlerRangePickerChange = (value) => {
    dispatch({
      type:SET_ELMOPTIONS,
      value:{
        defaultValue:value
      }
    })
    state.callBack && state.callBack(value)
  }
  return (
    <React.Fragment>
      <Form className="range_picker_form" layout="inline">
        {
          showRangesBtn ?
            <ButtonGroup>
              {

                buttonArray.map((item: any, index) => {
                  return <Button
                    type={item.actived ? 'primary' : 'default'}
                    data-key={index}
                    key={index}
                    onClick={(event) => (handlerClick(event))}
                  >{item.text}</Button>
                })
              }
            </ButtonGroup> : ''
        }
        {
          showRangesBtn ?
            <Form.Item>
              {
                getFieldDecorator('ranges', {
                })(
                  <RangePicker
                    onChange={handlerRangePickerChange}
                    disabledDate={(currentDate: any) => currentDate > moment().subtract(1, 'days')}
                  ></RangePicker>
                )
              }
            </Form.Item> :
            ((rangeButtons && rangeButtons.length > 0) ?
              <Form.Item>
                {
                  getFieldDecorator('ranges', {
                    initialValue: defaultValue
                  })(
                    <RangePicker
                      ranges={rangesData}
                      onChange={handlerRangePickerChange}
                      disabledDate={(currentDate: any) => currentDate > moment().subtract(1, 'days')}
                    ></RangePicker>
                  )
                }
              </Form.Item> :
              <Form.Item>
                {
                  getFieldDecorator('ranges', {
                    initialValue: defaultValue
                  })(
                    <RangePicker
                      style={{ width: 200 }}
                      onChange={handlerRangePickerChange}
                      disabledDate={(currentDate: any) => currentDate > moment().subtract(1, 'days')}
                    ></RangePicker>
                  )
                }
              </Form.Item>
            )

        }

      </Form>
    </React.Fragment>
  )
}
const DateRangeUI = Form.create({})(DateRangeContent) as any;
export default DateRangeUI;