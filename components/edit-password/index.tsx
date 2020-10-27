import * as React from 'react'
import { Form, Input, Button, message } from 'antd'
import JReap,{ JreapService } from 'jreap-core';

import './index.scss'



/**
 * 修改密码界面
 * @params formItemLayout 布局
 * @params closable 取消事件
 */



class PasswordFromUI extends React.Component<any>{

    state = {
        confirmDirty: false,
        newPW: null,
        text:'数字+字母+特殊字符(#@!~^&*._)组成的8-16位字符',
        variable:3,
        pwdhint:"0"
    }

    //获取初始值
    componentDidMount() {
        //获取登录信息的密码初始值设置
        let loginInfo:any=JReap.getSessionAttr("loginInfo")!;
        let _pwdhint:string=loginInfo&&loginInfo.pwdhint;
        this.setState({
            pwdhint:_pwdhint
        })
        //获取系统变量中密码强度字符
        let system:any=JReap.getSessionAttr("system_variable")!;
        let _pwdStrengthCheck:number=system&&system.pwdStrengthCheck;
        if(_pwdStrengthCheck==1){
            this.setState({
                variable:1,
                text: '6~16位数字组成'
            })
        }else if(_pwdStrengthCheck==2){
            this.setState({
                variable:2,
                text: '数字+字母组成的8-16位字符组成'
            })
        }else{
            this.setState({
                variable:3,
                text: '数字+字母+特殊字符(#@!~^&*._)组成的8-16位字符'
            })
        }
    }

    // 提交表单
    formSubmit = () => {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                // 发送请求
                JreapService.post(JReap.jreapProj + "web/right/accountManager/v1/changePassword.form",{
                    params: values
                }).then( (data: any) => {
                    if (data.data.pass == "false") {
                        message.error(data.message);
                    } else {
                        message.success('密码修改成功！');
                        setTimeout( ()=> {
                            const logoutUrl = JReap.jreapProj + "web/right/auth/logout.form";
                            top.window.location.href = logoutUrl;
                        }, 3000)
                    }
                })
            }
        });
    }

    // 新密码校验
    handleConfirm = (rule: any, value: string, callback: Function) => {
        const { form } = this.props;
        //保存新密码
        this.setState({
            newPW: value
        })
        //等保验证 密码需要 数字+字母+特殊字符组合并且为8-16位
        const regstrong = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#@!~^&*_.])[a-zA-Z\d#@!~^&*_.]{8,16}$/; 
        //等保验证 密码需要 由6~16位字符组成
        const regweak = /^[0-9]{6,16}$/;
        //等保验证 密码需要 由数字+字母组成的8-16位字符组成
        const regcenter = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
   
        //如果是1为弱密码，是2中密码，是3强密码
        let reg=this.state.variable==1?regweak:(this.state.variable==2?regcenter:regstrong);  

        if(value != null && value != '' && !reg.test(value)){
            callback(this.state.text)
        }

        if (value && this.state.confirmDirty) {
          form.validateFields(['newPwS'], { force: true });
        }
        callback();
    }

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      };


    // 再次输入密码校验
    handleConfirmSame = (rule: any, value: string, callback: Function) => { 
        const { form } = this.props;
        if (value && value !== form.getFieldValue('newPassword')) {
          callback('两次输入密码不一致!');
        } else {
          callback();
        }
    }



   

    render(){
        const { getFieldDecorator } = this.props.form

  


        return(
    
            <React.Fragment>
                <Form {...this.props.formItemLayout}>
                    <Form.Item label="原始密码">
                        {getFieldDecorator('originalPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入您的原始密码',
                                },
                            ],
                        })(<Input placeholder="请输入您的原始密码" />)}
                    </Form.Item>

                    <Form.Item   
                    label="新密码" 
                    >
                  
                         <p className="info">{this.state.text}</p>
                        {getFieldDecorator('newPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入您的新密码！',
                                },
                                { validator: this.handleConfirm }
                            ],
                  
                        })(<Input.Password placeholder="请输入您的新密码"/>)}
                    </Form.Item>

                    <Form.Item label="确认新密码" >
                        {getFieldDecorator('newPwS', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入您的新密码！',
                                },
                                { validator: this.handleConfirmSame }
                            ],
                        })(<Input.Password placeholder="请再次输入您的新密码" onBlur={this.handleConfirmBlur}/>)}
                    </Form.Item>
                    <div className="j-button-box">
                        <Button type="primary" onClick={this.formSubmit}>提交</Button>
                        <Button onClick={this.props.closable} disabled={this.props.disabled!=null?this.props.disabled:(this.state.pwdhint=="1"?true:false)}>取消</Button>
                    </div>
                </Form>

            </React.Fragment>
        )
    }
    
}

const EditPasswordFromUI = Form.create<any>({ name: 'edit_password' })(PasswordFromUI);

export default EditPasswordFromUI
