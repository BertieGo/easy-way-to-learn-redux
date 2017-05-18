/**
 * Created by huangwei on 17/5/17.
 */
function combineReducers(reducers) {
  //reducers => reducer1,reducer2,reducer3...
  let reducerKeys=Object.keys(reducers);
  //返回一个最终的reducer,每次dispatch都会触发这个combination函数
  return function combination() {
    //state是否是初始化状态?是的话那么为{},不是的话等于原来的值
    let state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    let action = arguments[1];
    //记录state是否有改变
    let hasChanged = false;
    //下一个state的容器
    let nextState = {};
    for (var i = 0; i <reducerKeys.length; i++) {
      let key = reducerKeys[i];//reducer1,reducer2,reducer3...String
      let reducer = reducers[key];//reducer1,reducer2,reducer3...Function
      let previousStateForKey = state[key];//初始化下为undefined
      let nextStateForKey = reducer(previousStateForKey, action);//每个reducer的初始值
      nextState[key] = nextStateForKey;//匹配key-value
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;//有改变为true,无改变为false
    }
    return hasChanged ? nextState : state;//返回最终的state
  }
}
export default combineReducers;