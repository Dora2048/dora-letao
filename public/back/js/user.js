/**
 * Created by me on 2018/9/27.
 */
//进入页面后发送ajax请求，从后台申请数据，渲染页面
$(function(){
  //1.封装渲染函数，渲染第一屏数据
  var currentPage = 1;
  var pageSize = 5;
  function render(){
    $.ajax({
      url:"/user/queryUser",
      type: "get",
      data:{
        page:currentPage || 1,
        pageSize:pageSize || 5
      },
      dataType:"json",
      success: function(info){
        console.log(info);
        //绑定模板
        var str = template("tmp",info);
        //渲染
        $("tbody").html(str);

        //2.分页插件初始化
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            //更新当前页
            currentPage = page;
            //更新后重新渲染
            render(page);
          }
        });


      }
    })
  }
  render();  //进入页面渲染第一屏数据





})