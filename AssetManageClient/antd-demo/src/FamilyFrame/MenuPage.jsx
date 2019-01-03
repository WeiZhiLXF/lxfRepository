import * as React from 'react';
import { Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
export class MenuPage extends React.Component {
   onMenuClick;
   constructor(props) {
      super(props);
      this.state = {
         current: '1',
         selected: document.location.pathname,
         username: '',
         lastGistUrl: ''
      }
   }

   componentWillReceiveProps(nextProps) {
      this.setState({
         selected: document.location.pathname
      })
      this.onMenuClick = this.props['onMenuClick'];
   }
   handleClick = (e) => {
      this.setState({
         current: e.key,
      });
      if (this.onMenuClick) {
         this.onMenuClick(e.key, this.menuPath[e.key]);
      }
   }
   render() {
      //根据当前的url显示指定的页面
      let selected = this.state.selected
      let ser = selected.split('/')
      let currentPage = '/' + ser[1]
      return (

         <Menu
            style={{ paddingTop: '20px' }}
            className='sider'
            defaultOpenKeys={['AssetManagement']}
            selectedKeys={[currentPage]}
            onClick={this.handleClick}
            mode="inline"
            theme='dark'
         >
            <Menu.Item key="/GDZC">
               <Link to='/GDZC'><Icon type="home" />固定资产管理系统</Link>
            </Menu.Item>
            {/*注意这里Menu.Item的key要和路由Link的to保持一致,Link组件可以渲染出链接并使用to属性指向相应路由*/}
            <SubMenu key='AssetManagement' title={<span>资产管理</span>} role='nav'>
               <Menu.Item key="/AssetInformation"><Link to='/AssetInformation'>资产信息</Link></Menu.Item>
               <Menu.Item key="/AssetCategory"><Link to='/AssetCategory'>资产类别</Link></Menu.Item>
               <Menu.Item key="/AssetAcceptance"><Link to='/AssetAcceptance'>资产验收</Link></Menu.Item>
               <Menu.Item key="/AssetSupplier"><Link to='/AssetSupplier'>供应商</Link></Menu.Item>
               <Menu.Item key="/DepartmentInformation"><Link to='/DepartmentInformation'>部门信息</Link></Menu.Item>
            </SubMenu>
            <SubMenu key='AuxiliaryFunction' title={<span>辅助功能</span>} role='nav'>
               <Menu.Item key="/AssetInspection"> <Link to='/AssetInspection'>资产巡检</Link></Menu.Item>
               <Menu.Item key="/AsserWarranty"><Link to='/AsserWarranty'>资产报修</Link></Menu.Item>
               <Menu.Item key="/MaintenanceInformation"><Link to='/MaintenanceInformation'>维修信息</Link></Menu.Item>
               <Menu.Item key="/Performance"> <Link to='/Performance'>业绩考核</Link></Menu.Item>
            </SubMenu>
            <SubMenu key='SystemManagement' title={<span>系统管理</span>} role='nav'>
               <Menu.Item key="/EmployeesInformation"><Link to='/EmployeesInformation'> 员工信息</Link></Menu.Item>
               <Menu.Item key="/RoleInformation"><Link to='/RoleInformation'>角色信息</Link></Menu.Item>
               <Menu.Item key="/Permissions"><Link to='/Permissions'>权限设置</Link></Menu.Item>
               <Menu.Item key="/Notice"><Link to='/Notice'>通知信息</Link></Menu.Item>
            </SubMenu>
            <SubMenu key='Details' title={<span>详情</span>} role='nav'>
               <Menu.Item key="/About"><Link to='/About'>关于</Link></Menu.Item>
            </SubMenu>
         </Menu>

      );
   }
}

export default MenuPage;
