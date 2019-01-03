import * as React from 'react'
import { Avatar } from 'antd';
import './MainFrame.css'
var userName;
export class MainFrame extends React.Component {

   constructor(props) {
      super(props);
      //获取session里面存储的用户信息
      userName = sessionStorage.getItem('userName');
      if (!userName) {
         userName = '未登录'
      }
   }
   render() {
      return (
         <div className="lxf-header">
            <span className="title">固定资产管理系统</span>
            <div className="username">
               <Avatar size="large" icon="user" /><span className="title">{userName}</span>
            </div>
         </div >
      )
   }
}