/**
 * Created by huangwei on 17/5/17.
 */

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

export default function bindActionCreators(actionCreators, dispatch) {
  //假如是一个函数了,这里判定是一个action function,所以直接调用dispatch
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  //将原先的actionCreators转化为新的boundActionCreators
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      //将dispatch传入,就可以直接在调用action的时候就发生dispatch
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
  //此函数最大的意义就是将dispatch绑定到action函数上
}