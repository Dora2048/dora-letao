/**
 * Created by me on 2018/9/28.
 */

$(function () {
  //1.进入页面，发送请求，渲染第一屏数据
  var currentPage = 1;
  var pageSize = 5;

  function render() {
    //发送请求
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      type: "get",
      dataType: "json",
      data: {
        page: currentPage || 1,
        pageSize: pageSize || 5,
      },
      success: function (info) {
        //console.log(info);
        //绑定模板，渲染页面
        $("tbody").html(template("tmp", info));

        //2.分页插件初始化
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
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

  render();


  //2.添加分类功能
  //需求分析：点击添加分类，添加摸态框弹出，此功能组件中已经内置
  //         添加表单校验功能，若不输入内容点击确定，给出提示信息，若输入内容，校验成功后，点击确认，发送请求，向后台传输数据

  //2.1 表单校验插件初始化
  $("#form").bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          //不为空验证
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  })
  //2.2注册表单校验成功事件，并禁止表单自动提交，通过Ajax向后台发送数
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      url: "/category/addTopCategory",
      type: "post",
      data: $("#form").serialize(),
      dataType: "json",
      success: function(info){
        console.log(info);
        if(info.success){
          //关闭摸态框
          $("#myModal").modal("hide");
          console.log(111);
          //请求成功后要重新渲染页面
          currentPage = 1;
          render();
          console.log(222)

          //重置表单
          $("#form").data("bootstrapValidator").resetForm();
          console.log(333)
        }
      }
    })

  })




})