import React from 'react';
import { Layout } from 'antd';
import { ContentPanel } from './ContentPanel';
import { MainFrame } from './MainFrame';
import { MenuPage } from './MenuPage';
const { Header, Sider, Content } = Layout;
/**
 * 增加this.props.children用来渲染子组件
 */
export class RefreshFrame extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <Layout style={{ width: "100%", height: "100%", background: '#fff' }}>
            <Header>
               <MainFrame />
            </Header>
            <Layout>
               <Sider >
                  <MenuPage />
               </Sider>
               <Content>
                  <ContentPanel />
               </Content>
            </Layout>
         </Layout>
      );
   }
}