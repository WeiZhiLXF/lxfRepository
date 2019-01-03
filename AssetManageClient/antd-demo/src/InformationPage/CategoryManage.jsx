import * as React from 'react';
import { Tree, Layout, Input } from 'antd';
const TreeNode = Tree.TreeNode;
const SearchInput = Input.Search;

const treeData = [{
   title: '0-0',
   key: '0-0',
   children: [{
      title: '0-0-0',
      key: '0-0-0',
      children: [
         { title: '0-0-0-0', key: '0-0-0-0' },
         { title: '0-0-0-1', key: '0-0-0-1' },
         { title: '0-0-0-2', key: '0-0-0-2' },
      ],
   }, {
      title: '0-0-1',
      key: '0-0-1',
      children: [
         { title: '0-0-1-0', key: '0-0-1-0' },
         { title: '0-0-1-1', key: '0-0-1-1' },
         { title: '0-0-1-2', key: '0-0-1-2' },
      ],
   }, {
      title: '0-0-2',
      key: '0-0-2',
   }],
}, {
   title: '0-1',
   key: '0-1',
   children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
   ],
}, {
   title: '0-2',
   key: '0-2',
   children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
   ],
}];
const dataList = [];
export class CategoryManage extends React.Component {
   /**构造器 */
   constructor(props) {
      super(props);
      this.state = {
         autoExpandParent: true,
         selectedKeys: [],
         search: true,
         expandedKeys: [],
         searchValue: '',//树搜索内容
      }
      this.generateList(treeData);//首先生成树列表
   }


   /**收起展开时触发 */
   onExpand = (expandedKeys) => {
      this.setState({
         expandedKeys,
         autoExpandParent: false,
      });
   }

   /**选中复选框时触发 */
   onCheck = (checkedKeys) => {
      this.setState({ checkedKeys });
   }

   /**选中树节点时触发 */
   onSelect = (selectedKeys, info) => {
      this.setState({ selectedKeys });
   }

   /**生成列表 */
   generateList = (treeData) => {
      for (var i = 0; i < treeData.length; i++) {
         var node = treeData[i];
         var key = node.key;
         var title = node.title;
         dataList.push({ key, title: key });
         if (node.children) {
            this.generateList(node.children, node.key);
         }
      }
   };

   /**绘制树节点 */
   renderTreeNodes = (data) => {
      const { searchValue, expandedKeys, autoExpandParent } = this.state;
      return data.map(
         (item) => {
            var index = item.title.indexOf(searchValue);
            var beforeStr = item.title.substr(0, index);
            var afterStr = item.title.substr(index + searchValue.length);
            var title = index > -1 ? (
               <span>
                  {beforeStr}
                  <span style={{ color: '#f50' }}>{searchValue}</span>
                  {afterStr}
               </span>
            ) : <span>{item.title}</span>;
            if (item.children) {
               return (
                  <TreeNode
                     title={title}
                     key={item.key}
                  >
                     {this.renderTreeNodes(item.children)}
                  </TreeNode>
               );
            }
            return <TreeNode key={item.key} title={title} />;
         });
   }

   /**树搜索 */
   onSearch = (keyOrValue) => {
      var expandedKeys = dataList.map((item) => {
         if (item.title.indexOf(keyOrValue) > -1) {
            return this.getParentKey(item.key, treeData);
         } else {
            return null;
         }
      }).filter((item, i, self) => item && self.indexOf(item) === i);
      this.setState({
         expandedKeys,
         searchValue: keyOrValue,
         autoExpandParent: true,
      });
   }

   /**得到父key */
   getParentKey = (key, treeData) => {
      var parentKey;
      for (var i = 0; i < treeData.length; i++) {
         var node = treeData[i];
         if (node.children) {
            if (node.children.some(item => item.key === key)) {
               parentKey = node.key;
            } else if (this.getParentKey(key, node.children)) {
               parentKey = this.getParentKey(key, node.children);
            }
         }
      }
      return parentKey;
   };

   /**主渲染方法 */
   render() {
      return (
         <Layout style={{ background: '#FFF', padding: '15px' }}>
            {this.state.search ?
               <SearchInput
                  style={{ marginBottom: 8 }}
                  placeholder="搜索"
                  onSearch={this.onSearch}
               /> : null}
            <Tree
               //checkable//是否复选
               onExpand={this.onExpand}//收起展开触发
               expandedKeys={this.state.expandedKeys}//展开指定的树节点
               autoExpandParent={this.state.autoExpandParent}//是否自动展开父节点
               onCheck={this.onCheck}//点击复选框触发
               checkedKeys={this.state.checkedKeys}//选中复选框的树节点
               onSelect={this.onSelect}//点击树节点触发
               selectedKeys={this.state.selectedKeys}//设置选中的树节点
            >
               {this.renderTreeNodes(treeData)}
            </Tree>
         </Layout>
      );
   }
}
