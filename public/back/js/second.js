/**
 * Created by me on 2018/9/28.
 */
$(function () {
  //1.进入页面，请求数据，渲染第一屏数据
  var currentPage = 1;
  var pageSize = 5;

  function render() {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: "get",
      data: {
        page: currentPage || 1,
        pageSize: pageSize || 5
      },
      dataType: "json",
      success: function (info) {
        //console.log(info);
        //绑定模板，渲染
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

  //2.点击下拉按钮，发送请求，后台返回数据渲染ul
  $(".dropdown-toggle").on("click", function () {
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      type: "get",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        //console.log(info);
        //绑定模板，渲染ul
        $(".dropdown-menu").html(template("tmp2", info));
      }

    })
  })

  //3.给下拉列表的每个a注册点击事件，获取a的内容，将其赋给button
  $(".dropdown-menu").on("click", "a", function () {
    //获取a 的内容
    var txt = $(this).text();
    //console.log(txt);
    //将获取到的内容赋值给button
    $("#dropdownTxt").text(txt);

    //获取当前a的id
    var id = $(this).data("id");
    //console.log(id);
    //将id存在隐藏域中
    $("input[name='categoryId']").val(id);
    //选择一级分类后，要将一级分类的检验状态更新到校验成功
    $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })

  //4.文件上传初始化，使用插件
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      //console.log(111);
      //获取图片上传的地址
      var src = data.result.picAddr;
      //console.log(src);
      //地址传给图片
      $(".imgbox img").attr("src", src);

      //将地址传递给隐藏域
      $("input[name='brandLogo']").val(src);

      $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });

  //5.表单校验初始化
  $("#form").bootstrapValidator({
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          //不为空验证
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      },
      brandName: {
        validators: {
          //不为空验证
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          //不为空验证
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }

  })

  //6.注册校验成功事件
  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/category/addSecondCategory",
      type: "post",
      data: $("#form").serialize(),
      dataType: "json",
      success: function (info) {
        console.log(info);
        if(info.success){
          // 关闭模态框
          $('#myModal').modal("hide");

          // 页面需要重新渲染, 重新渲染第一页
          currentPage = 1;
          render();

          // 表单需要重置, 文本和状态都要重置
          $("#form").data("bootstrapValidator").resetForm(true);

          // 重置只能重置表单元素, 下拉菜单的按钮和图片需要手动重置
          $('#dropdownTxt').text("请选择一级分类");
          $('.imgBox img').attr("src", "../images/none.png");
          //$(".imgbox img").attr("src", "");

        }

      }
    })
  })


})