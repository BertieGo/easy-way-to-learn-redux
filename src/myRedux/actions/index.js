/**
 * Created by huangwei on 17/5/17.
 */
export function increment() {
  return {
    type:'increment'
  }
}
export function decrement() {
  return {
    type:'DECREMENT'
  }
}

export function mockAsync() {
  return (dispatch,getState) =>{
    window.setTimeout(function () {
      dispatch(
        increment()
      )
    },1000)
  }
}