import * as React from 'react';
import { Modal, Upload, Icon } from 'antd';
import $ from 'jquery';
export class AssetDetailModal extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         visible: false,
         information: null,
         previewVisible: false,
         previewImage: '',
         fileList: [{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: '',
         }],
      }
   }
   componentWillReceiveProps(props) {

      var state = this.state;
      state.visible = props['visible'];
      state.information = props['information'];

   }
   /**隐藏弹窗 */
   hideModal = () => {
      this.setState({
         visible: false,
      });
   }
   handleCancel = () => this.setState({ previewVisible: false })

   handlePreview = (file) => {
      this.setState({
         previewImage: file.url || file.thumbUrl,
         previewVisible: true,
      });
   }

   handleChange = ({ fileList }) => this.setState({ fileList })

   beforeUpload(file) {
      this.getBase64(file, (imageUrl) => {
         this.setState({
            imageUrl,
         });
         if (imageUrl) {
            var apiurl = 'http://localhost:8095/user/upload';
            var u = imageUrl.substring(imageUrl.indexOf(',') + 1, imageUrl.length);
            var data = {
               image_name: file.name,
               image_data: u
            }
            $.ajax({
               type: 'POST',
               url: apiurl,
               dataType: 'json',
               data: data,
               success: function (data) {
                  console.log('成功' + JSON.stringify(data));
               }
            });
         }
      });
      return 1;
   }
   /**将图片编码，调用回调函数确保执行完回调函数在进行下一步 */
   getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
   }
   render() {
      const { previewVisible, previewImage, fileList } = this.state;
      const uploadButton = (
         <div>
            <Icon type="plus" />
            <div className="ant-upload-text">上传</div>
         </div>
      );

      return (
         <div>
            <Modal
               title="Modal"
               visible={this.state.visible}
               onOk={this.hideModal}
               onCancel={this.hideModal}
               okText="确认"
               cancelText="取消"
            >
               <div className="clearfix">
                  <Upload
                     listType="picture-card"
                     onPreview={this.handlePreview}
                     onChange={this.handleChange}
                     beforeUpload={this.beforeUpload.bind(this)}
                  >
                     {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                  <Modal
                     visible={previewVisible}
                     footer={null}
                     onCancel={this.handleCancel}>
                     <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
               </div>
            </Modal>
         </div>
      );
   }
}





