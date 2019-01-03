import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Switch, HashRouter, Route } from 'react-router-dom';
import { LoginForm } from './LoginFrame/LoginFrame';
import { RefreshFrame } from './FamilyFrame/RefreshFrame';
import store from './ReduxMain/ReduxMain'
import { addToCart } from './ReduxActions/actions';

console.log("initial state: ", store.getState());

/**
 * subscribe函数设置监听函数，一旦state发生改变，就自动执行这个函数
 * getState可以获取当前时间点的state值
 */
let unsubscribe = store.subscribe(
   () =>
      console.log(store.getState())
);

/**
 * dispatch是view发出Action的唯一方法
 */
store.dispatch(addToCart('Coffee 500gm', 1, 250));
store.dispatch(addToCart('Flour 1kg', 2, 110));
store.dispatch(addToCart('Juice 2L', 1, 250));

unsubscribe();
ReactDOM.render((
   <HashRouter >
      <Switch>
         <Route path='/login' component={LoginForm} />
         <Route path='/' component={RefreshFrame} />
      </Switch>
   </HashRouter>
),
   document.getElementById('root'),
);
registerServiceWorker();


