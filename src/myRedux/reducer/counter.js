/**
 * Created by huangwei on 17/5/18.
 */
export function incrementReducer(state=0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
}

export function decrementReducer(state=100, action) {
  switch (action.type) {
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}