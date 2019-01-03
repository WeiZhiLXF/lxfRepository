import { combineReducers } from 'redux';
import productsReducer from './ProductsReducer';
import cartReducer from './CartReducer';

const allReducers = {
   products: productsReducer,
   shoppingCart: cartReducer
}

/**
 * 使用组合函数组合多个reducer
 */
const rootReducer = combineReducers(allReducers);

export default rootReducer;