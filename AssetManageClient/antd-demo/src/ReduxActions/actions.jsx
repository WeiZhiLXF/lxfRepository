export const ADD_TO_CART = 'ADD_TO_CART';

/**
 * addToCart方法属于action creater， view要发多少种消息，就会有多少种action
 */
export function addToCart(product, quantity, unitCost) {
   return {
      /**
        * action是一个对象，type属性是必须的，代表action的名称
        * action描述当前发生的事情，改变state的唯一方法就是使用action
        * action会运输数据到store 
        */
      type: ADD_TO_CART,
      payload: {
         product,
         quantity,
         unitCost
      }
   }
}