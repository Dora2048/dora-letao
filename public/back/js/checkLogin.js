/**
 * Created by me on 2018/9/27.
 */
//在进入一个页面时，要进行登录判断，若为登录跳转到登陆页面

$(function(){
  //进入页面发送请求，从服务器返回的数据判读是否处于登录状态
  $.ajax({
    url:"/employee/checkRootLogin",
    type:"get",
    dataType:"json",
    success: function(info){
      console.log(info);
      if(info.error === 400){
        location.href = "login.html";
      }
      if(info.success){
        console.log("您已登录，可以访问");
      }
    }
  })
})