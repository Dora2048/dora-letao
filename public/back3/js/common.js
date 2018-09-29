/**
 * Created by me on 2018/9/28.
 */
//实现进度条功能，使用nprogress插件
$(document).ajaxStart(function () {  //第一个ajax请求发送时调用
  NProgress.start();   //开启进度条
})
$(document).ajaxStop(function () {
  //模拟网络延时
  setTimeout(function () {
    NProgress.done();  //关闭进度条
  }, 500)
})


