/**
 * Created by huangwei on 17/5/17.
 */
export default function createStore(reducer,preloadedState,enhancer) {
  //假如preloadedState是个函数,就是用在中间件的时候
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    //令enhancer等于这个函数,并且preloadedState设置为undefined
    enhancer = preloadedState;
    preloadedState = undefined;
    //这里内定了需要compose函数来进行函数合并,第一次看createStore的同学可以先跳过这个if语句,
    //跟接下来的并无关系,需要用到compose的时候再来看吧
    return enhancer(createStore)(reducer, preloadedState);
  }

  let currentReducer = reducer;
  let currentState = preloadedState;//默认的初始state
  let listener = [];//为subscribe函数预备的事件容器
  let ActionTypes={INIT:'@@redux/INIT'};//初始用的action

  dispatch({type:ActionTypes.INIT});//自动dispatch一次

  //替换reducer
  function replaceReducer(nextReducer) {
    currentState = preloadedState;
    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }
  //返回state
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = currentReducer(currentState,action);//执行reducer,返回state
    //执行subscribe事务
    for (var i = 0; i <listener.length; i++) {
      listener[i]();
    }
  }
  //添加subscribe事务
  function subscribe(fn) {
    listener.push(fn);
  }
  //将内部方法返回出去
  return {
    getState:getState,
    dispatch:dispatch,
    subscribe:subscribe,
    replaceReducer:replaceReducer
  };
}