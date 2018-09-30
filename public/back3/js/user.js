/**
 * Created by me on 2018/9/28.
 */
$(function () {

//1.点击menu 按钮，左侧收起，右侧同时向左挤压
  $(".head .menu").on("click", function () {
    $(".aside").toggleClass("move");
    $(".head").toggleClass("move2");
    $(".main").toggleClass("move2");
    console.log(1111);
  })

  //2.点击logout按钮，弹出摸态框
  $(".head .logout").on("click", function () {
    $('#logoutModal').modal();
    console.log(222);
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


  var currentPage = 1;
  var pageSize = 5;
  //1. 封装渲染，并渲染第一屏数据
  function render() {
    $.ajax({
      url: "/user/queryUser",
      type: "get",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        //绑定模板，渲染

        $("tbody").html(template("tmp", info));

        // 2.分页插件初始化
        $("#paginator").bootstrapPaginator({

          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;  //更新当前页
            //重新渲染当前页
            render(page);
          }
        });


      }

    })

  }


  render();  //渲染第一屏数据


})