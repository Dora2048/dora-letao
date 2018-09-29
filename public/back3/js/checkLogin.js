/**
 * Created by me on 2018/9/28.
 */
//在进入每个页面前要判断是否已经登录
$(function(){
  $.ajax({
    url: "/employee/checkRootLogin",
    type: "get",
    dataType: "json",
    success: function(info){
      console.log(info);
      if(info.error === 400){
        location.href = "login.html";
      }
    }

  })

})