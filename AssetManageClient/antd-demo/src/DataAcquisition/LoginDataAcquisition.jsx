import $ from 'jquery';
var assetInformationData = [];//资产信息
var loginState;//登录状态
/**获取登录状态 */
var getLoginState = async function (userName, passWord) {
   await $.ajax({
      url: 'http://localhost:8095/user/login',
      type: 'GET',//GET请求方式
      dataType: 'jsonp',//发起跨域请求，指定服务器返回的数据类型
      jsonp: 'callback',//指定参数名称
      async: true,
      data: { "userName": userName, "passWord": passWord },
      success: function (json) {
         var json = eval(json);
         if (json.status === 'ok') {
            loginState = true;
         } else if (json.status === 'null') {
            loginState = false;
         }
      }.bind(this)
   });
   return loginState;
}

/**在react中点击事件里面 setState 时会使this重新定义，
    * 所以在点击的函数里面使用this.setState()时会报错,
    * 因此需要提前给点击事件的函数绑定this 
    * */
var getAssetInformation = async function () {
   var name = '';
   await $.ajax({
      url: 'http://localhost:8095/user/search',
      type: 'GET',//GET请求方式
      dataType: 'jsonp',//发起跨域请求，指定服务器返回的数据类型
      jsonp: 'callback',//指定参数名称
      //async: false,//同步
      data: 'name=' + name + '',
      success: function (json) {
         var json = eval(json);
         if (json.status = 'ok') {
            for (var i = 0; i < json.data.length; i++) {
               assetInformationData.push({
                  IM_ID: json.data[i].IM_ID,
                  IM_NAME: json.data[i].IM_NAME,
                  IM_VA_ID: json.data[i].IM_VA_ID,
                  IM_SIZE: json.data[i].IM_SIZE,
                  IM_UNIT: json.data[i].IM_UNIT,
                  IM_NUMBER: json.data[i].IM_NUMBER,
                  IM_VALUE: json.data[i].IM_VALUE,
                  IM_DE_ID: json.data[i].IM_DE_ID,
                  IM_PLACE: json.data[i].IM_PLACE,
                  IM_STATE: json.data[i].IM_STATE,
               });
            }

         }
      }.bind(this)
   });
   return assetInformationData;
}
export {
   getLoginState,
   getAssetInformation,
};
