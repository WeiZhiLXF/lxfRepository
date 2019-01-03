import * as React from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal, message } from 'antd';
import { getLoginState } from '../DataAcquisition/LoginDataAcquisition';
const FormItem = Form.Item;
export default class LoginFrame extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         userName: ''
      }
   }

   /**获取登录返回状态 */
   getLoginValue = async (userName, passWord) => {
      var loginState = await getLoginState(userName, passWord);
      this.toGoDeal(loginState);
   }

   /**登录进行跳转处理 */
   toGoDeal = (loginState) => {
      if (loginState) {
         //通过session存储登录信息
         sessionStorage.setItem('userName', '李白');
         const { history } = this.props;
         history.push({ pathname: "/", state: { userName: '李白' } });
         message.success('登录成功');
      } else {
         Modal.warning({
            title: '登录提示！',
            content: '用户名或密码错误！！',
            okText: '确定',
            onOk() { },
         });
      }
   }

   /**提交登录信息 */
   handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (err) {
            console.log('err:' + err);
         } else {
            this.getLoginValue(values.userName, values.password);
         }
      });
   }
   render() {
      const { getFieldDecorator } = this.props.form;
      return (
         <Form onSubmit={this.handleSubmit} className="login-form" style={{ position: "absolute", width: "300px", minWidth: "200px", height: "600px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", margin: "0" }}>
            <FormItem>
               {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入用户名!' }],
               })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
               )}
            </FormItem>
            <FormItem>
               {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
               })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
               )}
            </FormItem>
            <FormItem>
               {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: false,
               })(
                  <Checkbox>记住密码</Checkbox>
               )}
               <a className="login-form-forgot" href="">找回密码</a>
               <br />
               <Button type="primary" style={{ width: '300px' }} htmlType="submit"> 登录</Button>
               <br />
               <a href="">注册</a>
            </FormItem>
         </Form>
      );
   }
}

export const LoginForm = Form.create({})(LoginFrame);