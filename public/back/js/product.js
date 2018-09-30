/**
 * Created by me on 2018/9/30.
 */
$(function () {
//1.发送请求，渲染第一屏数据
  var currentPage = 1;
  var pageSize = 2;

  function render() {
    $.ajax({
      url: "/product/queryProductDetailList",
      type: "get",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        //绑定模板，渲染
        $("tbody").html(template("listTmp", info));

        //2.分页插件初始化
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            //更新当前页
            currentPage = page;
            //更新后重新渲染
            render();
          },
          //按钮内容显示为中文
          itemTexts:function(type,page,current){
            switch (type){
              case "page":
                return page;
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "first":
                return "首页";
              case "last":
                return "尾页";
            }
          },
          //鼠标悬停时显示的文本
          tooltipTitles:function(type,page,current){
            //console.log(type,page,current);
            switch (type) {
              case "page":
                return "前往第"+page +"页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "first":
                return "前往首页";
              case "last":
                return "前往尾页";
            }
          }
        });
      }
    })
  }

  render();
//2.分页插件初始化
//3.点击下架、上架按钮修改状态，摸态框
//4.点击添加商品摸态框下拉框，发送请求，获取二级分类，渲染
//5.给下拉框中的a注册点击事件
//6.多文件上传插件初始化
//7.表单校验初始化
  //用户名、库存用正则校验
//8.注册表单校验成功事件
//9.表单重置


})