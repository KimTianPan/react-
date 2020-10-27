import * as React from 'react';
import { Modal} from 'antd';
import JReap from 'jreap-core';
import EditPasswordUI from './index'

class ModalEditPassword extends React.Component<any> {
    state = { 
        visible: this.props.showmodel!==null?this.props.showmodel:false,//模态窗口是否打开
        pwdhint:"0"  //为1时右上角关闭按钮隐藏
    };
  
    componentDidMount() {
        //获取登录信息的密码初始值设置
        let loginInfo:any=JReap.getSessionAttr("loginInfo")!;
        let _pwdhint:string=loginInfo&&loginInfo.pwdhint;
        this.setState({
            pwdhint:_pwdhint
        })
    }

    handleCancel = e => {
      this.setState({
        visible: false,
      });
    };
  
    render() {
      return (
          <div>
            <Modal
                title="修改密码"
                visible={this.state.visible}
                footer={null}
                onCancel={this.handleCancel}
                closable={this.state.pwdhint=="1"?false:true}
                >
                 <EditPasswordUI closable={this.handleCancel}/>
            </Modal>
            </div>
            
      );
    }
  }

export default ModalEditPassword
