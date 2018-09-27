/**
 * Created by me on 2018/9/27.
 */
//实现进度条功能，使用nprogress插件
//全局ajax
//ajax全局事件
//  .ajaxComplete()  当每个ajax完成时调用（不管成功与否）
//  .ajaxError()    当每个ajax请求失败的时候调用
//  .ajaxSuccess()  当每个ajax请求成功时调用
//  .ajaxSend()   在每个ajax请求发送前调用

//  .ajaxStart()  在第一个ajax请求发送的时候调用
//  .ajaxStop()   在所有的ajax请求完成的时候调用

//全局ajax事件可以有任意元素调用，但实际上一般使用document 调用

$(document).ajaxStart(function(){
  //开启进度条
  NProgress.start();
});
$(document).ajaxStop(function(){
  //关闭进度条
  NProgress.done();
})