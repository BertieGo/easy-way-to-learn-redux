通过阅读redux(version 3.6.0)和redux-thunk(version 2.0.0)的源码，全部加起来将近1500行代码，除去注释，接近1000行代码，去除大量的验证类型功能，再重写一套新的redux API (多数建立在原先的基础上)，浓缩为200-300行代码，其中加入了我的注释，更加方便阅读和理解。

//这个repository的目的是在用简洁的代码来剖析redux的运作机制，同时在其中我所删减掉的大量验证类型的代码也是很有学习意义的，所以在阅读本文档的同时，我也建议你去看一遍原来的redux源码，除了applyMiddleware和thunk这一块有点绕之外，其他都是很好理解，半天差不多可以看完全部的源码了。

通过学习这个repository，假设你已经对redux有初步的使用经验和对FP(函数式编程)已经有一定的了解，那么你可以在1个小时内，对redux有更深层次的了解，同时实现middleware功能。

假如你认为这个repository对你有帮助，请给个star吧！谢谢。

----------------------------------------------------------

使用方式：
npm install 

npm start

运行地址：http://localhost:3000/

edited by Bertie
2017.5.18
