import { createStore } from "redux";
import rootReducer from '../ReduxReducers';

/**
 * 创建redux存储区，只能用reducer作为参数构造
 * 可以直接访问存储区里的数据，通过提供的reducer进行更新，一个文件只能有一个store，
 * Reducer 函数不需要手动调用，store.dispatch方法会触发 Reducer 的自动执行。
 * 为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法
 */
let store = createStore(rootReducer);

export default store;