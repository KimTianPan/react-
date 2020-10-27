import * as React from 'react';
import 'antd/dist/antd.css';
import { Upload, Button, Icon } from 'antd';
import JReap from 'jreap-core';
import moment = require('moment');

export class DTUpload extends React.Component<any> {
  constructor(props) {
    super(props);
  }

  state = {
    listType: '',
    defaultFileList: [] as any,
    fileList: [] as any,
    uploadText: '',
    multiple: false,
    uploadArray: [] as any,
    maximum: 0
  } as any
  static getDerivedStateFromProps(nextProps) {
    return {
      listType: nextProps.listType || 'text',
      defaultFileList: nextProps.defaultFileList || [],
      uploadText: nextProps.uploadText || '上传',
      multiple: nextProps.multiple,
      maximum: nextProps.maximum || 0
    }
  }
  componentDidMount() {

  }
  private maximun = 0;
  uploadData = (info) => {
    let uploadArray = [] as any;
    let fileList = [...info.fileList];
    fileList = fileList.slice(-2);
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
        uploadArray.push(file.response.id)
      }
      return file;
    });
    this.setState({ fileList })
    this.setState({ uploadArray: uploadArray })
    this.props.onUpload(this.state.uploadArray)
  }
  saveUpload = () => {
    return this.state.uplpadArray;
  }
  render() {
    const props = {
      action: JReap.jreapProj + `/web/fileupload/upload.form?bizType=enterSamplingDataVehiclefileId&bizId=null&uploadType=1&lastModified=${moment(new Date()).format('YYYY-MM-DD')}&subPath=mc`,
      defaultFileList: this.state.defaultFileList,
      fileList: [ ...this.state.defaultFileList,...this.state.fileList]
    }
    return (
      <Upload {...props} onChange={(info) => { this.uploadData(info) }} showUploadList={{ showPreviewIcon: false, showRemoveIcon: true, showDownloadIcon: false }}>
        <Button>
          <Icon type="upload" /> {this.state.uploadText}
        </Button>

      </Upload>
    )
  }
}
export default DTUpload
//引入控件
// import { JreapUpload } from 'jreap-leaf'
// import React from 'react'
// import JReap from 'jreap-core'
// import moment from 'moment'

// // 上传参数
// const param: any = {
//     bizType: 'acountPutuers',
//     bizId: null,
//     uploadType: '1',
//     lastModified: '',
//     subPath: '',
//     orderName: 'recordDate',
//     six: 'asc'
// }

// let str = ''

// for (var i in param) {
//     str += `${i}=${param[i]}&`
// }

// export class JreapUploadDemo extends React.Component<any> {
//     constructor(props) {
//         super(props);
//     }
//     componentDidMount() {
//         this.props.onRef(this);

//     }
//     state = {
//         dataSource: {   // 请求源
//             preview: {  // 普通预览
//                 url: '/jreap/web/fileupload/viewFile.form', // 请求地址
//                 type: 'POST',   // 请求方式 
//                 keyValue: { // 请求参数，key： 请求参数属性名，value：与后端数据匹配的属性名
//                     attachName: 'attachName',
//                     attrId: 'id'
//                 },
//                 data: { // 请求参数
//                     attrId: ''
//                 }
//             },
//             download: { // 下载
//                 url: '/jreap/web/fileupload/downloadData.form',
//                 type: 'POST',
//                 // keyValue: {
//                 //     attachName: 'attachName',
//                 //     attrId: 'id'
//                 // },
//                 // data: {
//                 //     a: 'aa'
//                 // }
//             },
//             remove: { // 删除
//                 url: '/jreap/web/fileupload/deleteData.form',
//                 type: 'POST',
//                 // keyValue: {
//                 //     attachName: 'attachName',
//                 //     attrId: 'id'
//                 // },
//                 // data: {
//                 //     a: 'aa'
//                 // }
//             },
//             fileList: { // 已上传的列表
//                 url: '/jreap/web/fileupload/list.form',
//                 type: 'GET',
//                 data: {
//                     bizType: 'acountPutuers',
//                     bizId: '40281581730925b60173093cf7610000',
//                     uploadType: '1',
//                     lastModified: '',
//                     subPath: '',
//                     orderName: 'recordDate',
//                     six: 'asc'
//                 }
//             },
//             idocView: { // idoc预览
//                 url: '/jreap/web/fileupload/getIdocUrl.form',
//                 type: 'GET',
//                 keyValue: {
//                     attachName: 'attachName',
//                     attrId: 'id'
//                 },
//                 data: {
//                     filePath: 'pice',
//                 }
//             }
//         },

//         setProps: {
//             name: 'file',
//             accept: '.doc,.docx,.js,.png,.xls',
//             action: JReap.jreapProj + `/web/fileupload/upload.form?bizType=enterSamplingDataVehiclefileId&bizId=null&uploadType=1&lastModified=${moment(new Date()).format('YYYY-MM-DD')}&subPath=mc`,
//             headers: {
//                 Accept: '*/*; q=0.5, application/json'
//             },
//             onDownload(file) {
//                 console.log('点击下载文件时的回调')
//             },
//             onChange(info) {
//                 console.log('上传文件改变时的状态')
//             },
//             onPreview(file) {
//                 console.log("JreapUploadDemo -> onPreview -> this", this)

//                 console.log("JreapUploadDemo -> onPreview -> this.props", this.props)
//             },
//             onDelete(file) {
//                 console.log('删除文件')
//             }
//         }
//     }
   
//     onPreview = (ifon) => {
//         console.log("JreapUploadDemo -> onPreview -> ifon", ifon)
//         console.log("JreapUploadDemo -> onPreview -> this.props", this.props)
//     }
//     render() {
//         return (
//             <JreapUpload {...this.state} />
//         )
//     }

// }

// export default JreapUploadDemo;