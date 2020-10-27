import * as React from 'react';
import 'antd/dist/antd.css';
import { Button, Drawer } from 'antd';
import QRCode from 'qrcode.react';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import './index.scss'
import { DTInput } from '@/components/DTInput/DTInput';
import { post } from '@/api/util';
const qs = require('qs')
export class QrcodeIndex extends React.Component<any> {
  constructor(props) {
    super(props);
  }

  state = {
    visible: false,
    qrUrl: '',
    showSearch: true,
    barrelNo: ''
  } as any;
  componentDidMount() {
    if (this.state.showSearch) {
      this.getBarrelNo({}, `id=${this.props.parentId}`)
    }
  }
  static getDerivedStateFromProps(nextProps, privateProps) {
    return {
      visible: nextProps.visible,
      showSearch: nextProps.showSearch === false ? nextProps.showSearch : true,
      qrUrl: nextProps.url ? nextProps.url : ''
    }
  }

  print = (handlePrint) => {
    if (!this.props.formData.dimenCodeOne) {
      post('/infurnaceSamplingDimenOne/saveBatch', {}, qs.stringify({
        barrelNo: this.state.barrelNo,
        mainId: this.props.formData.charingBatchInfoId,
        infurnaceSamplingId: this.props.formData.id,
        creator: localStorage.getItem('defaultUser'),
        state: 0,
        simplingBatch: this.props.formData.simplingBatch
      })).then(data => {
        console.log("QrcodeIndex -> print -> data", data)
        new Promise((res, rej) => {
          if (data.data) {
            res(this.setState({
              qrUrl: data.data.result.dimenCodeOne
            }))
          } else {
            rej()
          }
        }).then(data => {
          handlePrint()
          // this.props.getData()
        })
      })
    } else {
      handlePrint()
      this.props.getData()
    }

    console.log("QrcodeIndex -> print -> printpage", handlePrint)

  }

  getBarrelNo = (page: any = '', params: any = '') => {
    post('/infurnaceSamplingDimenOne/getBarrelNo', page, params).then(data => {
      console.log("QrcodeIndex -> getBarrelNo -> data", data)
      this.setState({
        barrelNo: data.message
      })
    })
  }


  onClose = () => {
    this.props.onClose()
  };
  onBeforeGetContent = () => {
    
    console.log("onBeforeGetContent -> 1", 1)
  }
  onAfterPrint = () => {
    this.props.onClose()

    console.log("QrcodeIndex -> onAfterPrint -> e", 1234)

  }
  componentRef
  render() {
    return (


      <Drawer
        title="打印"
        placement="right"
        destroyOnClose
        closable={false}
        onClose={this.onClose}
        visible={this.state.visible}
        width={"50%"}
      >

        <div className='head'>
          <ReactToPrint
            content={() => this.componentRef}
            onAfterPrint={this.onAfterPrint}
            onBeforeGetContent={this.onBeforeGetContent}
          >
            <PrintContextConsumer>
              {({ handlePrint }) => (
                <Button type='primary' onClick={() => {
                  this.print(handlePrint)
                }}>打印</Button>
              )}
            </PrintContextConsumer>
          </ReactToPrint>
          <Button onClick={() => { this.onClose() }}>关闭</Button>
        </div>
        {this.state.showSearch ?
          <div className='search'>
            <div className='display-inline-block search-label'>
              <span>*</span>桶号:
           </div>
            <div className='display-inline-block'>
              <DTInput onChange={(value) => { this.setState({ barrelNo: value }) }} value={this.state.barrelNo}></DTInput>
            </div>
          </div>
          : ''}
        <div className="qrcode-style">
          <QRCode
            value={'asdlkjaskdljalksdjkasldjksaljdlk'}  //value参数为生成二维码的链接
            size={400} //二维码的宽高尺寸
            fgColor="#000000"  //二维码的颜色
          />
        </div >
        <div ref={el => (this.componentRef = el)} className="qrcode-style">
          <QRCode
            value={this.state.qrUrl}  //value参数为生成二维码的链接
            size={400} //二维码的宽高尺寸
            fgColor="#000000"  //二维码的颜色
          />
        </div >

      </Drawer>
    )
  }
}
