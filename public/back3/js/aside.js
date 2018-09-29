/**
 * Created by me on 2018/9/28.
 */
$(function () {
//1.点击menu 按钮，左侧收起，右侧同时向左挤压
  $(".head .menu").on("click", function () {
    $(".aside").toggleClass("move");
    $(".head").toggleClass("move2");
    $(".main").toggleClass("move2");
  })

  //2.点击logout按钮，弹出摸态框
  $(".head .logout").on("click", function () {
    $('#logoutModal').modal();
  })
  //3.点击退出按钮，向后台发送请求，登出
  $("#logoutBtn").on("click",function(){
    $.ajax({
      url:"/employee/employeeLogout",
      type: "get",
      dataType: "json",
      success: function(info){
        console.log(info);
        if(info.success){
          location.href = "login.html";
        }
      }

    })
  })


})
