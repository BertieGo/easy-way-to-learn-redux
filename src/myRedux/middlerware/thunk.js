/**
 * Created by huangwei on 17/5/18.
 */
/**
 *这是一个约定好的中间件书写格式,可能会看到这么多个return有一些迷茫,thunk的代码解读的时候是要配合applyMiddleware
 * 一起才更容易理解
 */
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    //_ref是middleware种chain内加入的middlewareAPI
    var dispatch = _ref.dispatch,
      getState = _ref.getState;
    return function (next) {
      //next为一个内建函数function (e){return t.dispatch(liftAction(e)),e}
      return function (action) {
        //action指的是{type:"ACTION"}或者是异步函数
        if (typeof action === 'function') {
          //假如是一个函数,判定是异步函数,将dispatch和getState传入,从而实现异步dispatch
          return action(dispatch, getState, extraArgument);
        }
        //假如不是一个函数,直接执行dispatch
        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
export default thunk;