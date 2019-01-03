import { ADD_TO_CART } from '../ReduxActions/actions';

/**初始化状态 */
const initialState = {
   cart: [
      {
         product: 'bread 700g',
         quantity: 2,
         unitCost: 90
      },
      {
         product: 'milk 500ml',
         quantity: 1,
         unitCost: 47
      }
   ]
}

/**
 * 给state分配一个默认值，避免state的默认值为undefined或null
 * state为保存在store中的数据
 * action是一个对象，有type属性（必须），其他属性可以自由设置
 * store收到Action以后，必须给出一个新的state，这样view才会发生变化，这种state的计算过程叫做reducer
 */
export default function (state = initialState, action) {
   switch (action.type) {
      case ADD_TO_CART: {
         return {
            ...state,
            cart: [...state.cart, action.payload]
         }
      }
      default: return state;
   }
}

/**
 * 使用combineReducers方法，用于Reducer的拆分
 * 总之，combineReducers()做的就是产生一个整体的 Reducer 函数。
 * 该函数根据 State 的 key 去执行相应的子 Reducer，并将返回结果合并成一个大的 State 对象。
 * 可以把所有子 Reducer 放在一个文件里面，然后统一引入。
 */