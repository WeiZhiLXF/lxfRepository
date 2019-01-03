import * as React from "react";
import * as BABYLON from 'babylonjs';
import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

class Entity {
   scene;
}
export class AssetInformation3DScene extends React.Component {
   //初始化实体
   entity = new Entity();
   //初始化时间循环
   //public timer: any;
   //构造处理
   constructor(props, context) {
      super(props, context);
   }

   //页面加载完渲染
   componentDidMount() {
      //获取canvas DOM元素
      this.entity.canvas = document.getElementById('renderCanvas');
      //加载babylon引擎
      this.entity.engine = new BABYLON.Engine(this.entity.canvas, true);
      //加载场景参数
      this.createScene();
      //渲染场景
      this.updateScene();
      //定时渲染场景
      this.timer = setInterval(() => this.updateScene(), 0);
   }

   //组件移除时候调用
   componentWillUnmount() {
      clearInterval(this.timer);
   }


   //设置场景参数
   createScene = () => {
      //设置基本场景添加到引擎中
      this.entity.scene = new BABYLON.Scene(this.entity.engine);
      //创建一个摄像机
      this.entity.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), this.entity.scene);
      this.entity.camera.setPosition(new BABYLON.Vector3(5, 5, -5));
      //设置摄像机定位到场景
      this.entity.camera.setTarget(BABYLON.Vector3.Zero());
      //将相机链接到画布
      this.entity.camera.attachControl(this.entity.canvas, true);
      //设置一个基础灯光
      this.entity.light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), this.entity.scene);
      this.entity.light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), this.entity.scene);
      // BABYLON.SceneLoader.ImportMesh("", "src/model/JiQiRenModel/", "mesh2.obj", this.entity.scene, ((newMeshes) => {
      //    //设置第一视角
      //    this.entity.camera.target = newMeshes[0];
      //    this.entity.scene.createDefaultCameraOrLight(true, true, true);
      // }));
   }

   //渲染场景
   updateScene = () => {
      this.entity.scene.render();
   }

   //渲染页面
   render() {
      var docHeight = document.body.clientHeight;
      var docWidth = document.body.clientWidth;
      return (
         <canvas id="renderCanvas" touch-action="none" style={{ height: docHeight, width: docWidth }}></canvas>
      );
   }
}

