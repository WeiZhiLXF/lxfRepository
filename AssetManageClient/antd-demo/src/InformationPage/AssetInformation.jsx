import * as React from 'react'
import { Button, Form, Input, Select, Table } from 'antd';
import { AssetDetailModal } from './AssetDetailModal';
import { getAssetInformation } from '../DataAcquisition/LoginDataAcquisition';
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;
var columns;

export class AssetInformation extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         dataSource: [],
         detailVisible: false,//详情弹窗
         imgID: null,
         information: null,
         addVisible: false,//新增弹窗
      }
      this.loaddata();
      this.initColumns();
   }

   /**初始化列表 */
   initColumns() {
      columns = [
         { title: '资产编号', dataIndex: 'IM_ID', key: 'IM_ID', width: '8%' },
         { title: '资产名称', dataIndex: 'IM_NAME', key: 'IM_NAME', width: '8%' },
         { title: '资产类别', dataIndex: 'IM_VA_ID', key: 'IM_VA_ID', width: '8%' },
         { title: '资产型号', dataIndex: 'IM_SIZE', key: 'IM_SIZE', width: '8%' },
         { title: '资产单位', dataIndex: 'IM_UNIT', key: 'IM_UNIT', width: '8%' },
         { title: '资产数量', dataIndex: 'IM_NUMBER', key: 'IM_NUMBER', width: '8%' },
         { title: '资产价值', dataIndex: 'IM_VALUE', key: 'IM_VALUE', width: '8%' },
         { title: '保管部门', dataIndex: 'IM_DE_ID', key: 'IM_DE_ID', width: '8%' },
         { title: '存放位置', dataIndex: 'IM_PLACE', key: 'IM_PLACE', width: '8%' },
         { title: '资产状态', dataIndex: 'IM_STATE', key: 'IM_STATE', width: '8%' },
         {
            title: '操作', key: 'operation', width: '80%',
            render: (text, record) =>
               <div>
                  <Button type='primary' onClick={() => this.AssetDetail(record)}>详情</Button>
                  <Button type='danger' onClick={() => this.AssetInsert(record)}>新增</Button>
                  <Button type='primary' onClick={() => this.AssetUpdate(record)}>修改</Button>
               </div>
         },
      ];
   }

   /**加载列表数据 */
   loaddata = async () => {
      var data = await getAssetInformation();
      this.setState({ dataSource: data });
   }

   /**点击新增方法 */
   AssetInsert = (record) => {
      this.setState({
         detailVisible: true,
      });
   }

   /**点击详情方法 */
   AssetDetail = (record) => {
      const { match, location, history } = this.props;
      history.push({ pathname: "/AssetInformation/AssetInformation3DScene" });
      this.setState({
      });
   }

   /**点击改修方法 */
   AssetUpdate = (record) => {
   }
   render() {
      return (
         <div style={{ height: 'calc(100% - 40px)', padding: '0 20px 20px' }}>
            <div style={{ width: "100%", height: "auto", margin: "10px 0", padding: '10px 10px 40px 10px', background: "#ffffff" }}>
               <Form layout="inline">
                  <FormItem label="状态：" labelCol={{ span: 0, offset: 0 }} wrapperCol={{ span: 0, offset: 0 }}>
                     <Select defaultValue={"1"} style={{ width: 130 }}>
                        <Option value={"1"}>全部</Option>
                        <Option value={'2'}>待审核</Option>
                        <Option value={'3'}>未通过</Option>
                        <Option value={'4'}>通过</Option>
                     </Select>
                  </FormItem>
                  <FormItem label="排序方式：" labelCol={{ span: 12, offset: 0 }} wrapperCol={{ span: 12, offset: 0 }}>
                     <Select defaultValue={"createDate,false"} style={{ width: 150 }}>
                        <Option value="createDate,false">时间-倒序</Option>
                        <Option value="createDate,true">时间-正序</Option>
                        <Option value="name,true">名称-正序</Option>
                        <Option value="name,false">名称-倒序</Option>
                     </Select>
                  </FormItem>
                  <FormItem style={{ width: "250px" }} wrapperCol={{ span: 24, offset: 4 }} >
                     <Search placeholder="请输入文件/资源名称/ID" enterButton={true} />
                  </FormItem>
               </Form>
               <Table
                  columns={columns}
                  dataSource={this.state.dataSource}
               />
               <AssetDetailModal
                  visible={this.state.detailVisible}
               />
            </div>
         </div>
      )
   }
}