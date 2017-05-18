import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore,combineReducers,bindActionCreators,applyMiddleware,compose} from './myRedux/API/index'
import {thunk,uppercaseMW} from './myRedux/middlerware/index'
import * as _actions from './myRedux/actions/index'
import rootReducer from './myRedux/reducer/index'

let store = createStore(rootReducer,compose(
  applyMiddleware(thunk,uppercaseMW),
  window.devToolsExtension ?
    window.devToolsExtension() :
    f => f
));

//合并action
let actions = bindActionCreators(_actions,store.dispatch);


//监听store变化
store.subscribe(function () {
  //console.log(store.getState());
});

//store.dispatch({ type: 'INCREMENT' });
//store.dispatch({type:'mockAsync'})

//进行触发测试
actions.increment();
actions.mockAsync();

class App extends Component {
  render() {
    return (
      <div></div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
