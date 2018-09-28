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

// 公共的效果
// 1. 二级菜单切换效果
// 2.点击菜单高亮
// 3. 左侧菜单栏切换
// 4. 退出功能


$(function(){
  // 1. 二级菜单切换效果
  //需求分析：点击分类管理，下属子元素显示
  $(".category").on("click",function(){
    console.log(111);
    $(this).siblings().stop().slideToggle();
    //$(".navlist .child").slideToggle();
  })

//// 2. 点击菜单高亮
//  $(".navlist a").on("click",function(){
//    $(this).toggleClass("current");
//  })
//此功能可在html页面中添加类完成，效率更高

// 3. 左侧菜单栏切换
//点击icon-menu按钮，整个左侧侧边栏收起
  $(".icon-menu").on("click",function(){
    //console.log(222);
    $(".aside-left").toggleClass("move");
    $(".aside-right").toggleClass("moveLeft");
    $(".aside-right .head").toggleClass("moveLeft");
  })

// 4. 退出功能
//需求分析:点击icon-logout按钮，摸态框弹出
//        点击摸态框中的取消按钮，摸态框隐藏，摸态框插件中已经内置，无需再写
//        点击摸态框中的退出按钮，跳转到登录页面，退出功能由后台数据提供

  $(".icon-logout").on("click",function(){
    $("#logoutModal").modal("show");
  })

  $("#logout").on("click",function(){
    //点击按钮后，发送请求，向后台申请数据
    $.ajax({
      url:"/employee/employeeLogout",
      type:"get",
      dateType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          location.href = "login.html";
        }
      }
    })
  })








})


