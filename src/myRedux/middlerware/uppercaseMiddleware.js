/**
 * Created by huangwei on 17/5/18.
 * 这是模拟的一个将action中的type转化为大写的中间件,中间件的作用就是在action被dispatch,发送到
 * reducer中之前,将action进行封装
 */

function uppercaseMiddleware(extraArgument) {
  return function (_ref) {
    let dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action !== 'function' && action.type !== 'undefined') {
          let result=Object.assign({},action,{type:action.type.toUpperCase()});
          return next(result);
        }
      };
    };
  };
}

var uppercaseMW = uppercaseMiddleware();
export default uppercaseMW;