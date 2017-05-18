/**
 * Created by huangwei on 17/5/17.
 */
/**
 compose这个函数的意义就是将多个管道函数合并起来,
 举个例子,你需要对一个数组进行删除最后一个成员,删除最前面的一个成员,然后倒序数组,最终得到结果
 在考虑到函数原子化的基础上,你可以能这样写:
  --获得结果
  function getResult(arr) {
    return arr;
  }
  --倒叙数组
  function reverseArr(arr) {
    return arr.reverse()
  }
  --删除最后一个成员
  function popArr(arr) {
    return arr.slice(0,-1)
  }
  --删除第一个成员
  function shiftArr(arr) {
    arr.shift();
    return arr;
  }
  最后你的函数就会是这样:
  getResult（
    popArr（
      shiftArr（
        reverseArr（
            arr
          ）
      ）
    ）
  ）
  先抛开其他来说,这样的写法在维护起来十分不易,并且容易紊乱.
  所以我们需要compose这个聪明的函数去帮我们合并这些管道函数,我们要实现的方式如下:
  compose(getResult,popArr,shiftArr,reverseArr)(arr);

 */

export default function compose() {
  let _len = arguments.length,
      funcs = Array(_len);
  //将参数全部塞进funcs这个数组里面
  for (var _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  //假如没有参数,直接返回一个匿名的无用函数
  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }
  //假如只有一个函数作为参数,直接返回该函数
  if (funcs.length === 1) {
    return funcs[0];
  }

  let  last = funcs[funcs.length - 1];//最后一个参数
  let  rest = funcs.slice(0, -1);//除了最后一个前面的参数

  return function () {
    //reduceRight的用法跟reduce一样,只不过是从尾部开始叠加,参数设置一样,第一个为回调函数,第二个是初始值
    //更多的不在累述,对这个API生疏的同学可直接去MDN查看
    return rest.reduceRight(function (composed, f) {
      //将最后一个函数最为起点,直接调用该函数作为初始值
      //不断回溯遍历之前的函数,逐个执行
      return f(composed);
    }, last.apply(undefined, arguments));
  };
}