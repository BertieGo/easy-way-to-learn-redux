/**
 * Created by huangwei on 17/5/17.
 */
import compose from './compose';
//对象继承函数,此处不再累述这个API
let _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

export default function applyMiddleware() {
  //将中间件塞入到middlewares数组中
  let _len = arguments.length,
    middlewares = Array(_len);
  for (var _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      //获取store
      var store = createStore(reducer, preloadedState, enhancer);
      //获取dispatch
      var _dispatch = store.dispatch;
      var chain = [];
      //将getState和dispatch放入到middlewareAPI中
      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);//将middlewareAPI作为参数放入到中间件中,比如thunk(middlewareAPI)
      });
      //重新封装dispatch,将中间件内的函数嵌入dispatch中
      _dispatch = compose.apply(undefined, chain)(store.dispatch);
      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}