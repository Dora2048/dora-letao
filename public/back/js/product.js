/**
 * Created by me on 2018/9/30.
 */
$(function () {
//1.发送请求，渲染第一屏数据
  var currentPage = 1;
  var pageSize = 2;
  var picArr = []; //定义空数组用于接收图片对象

  function render() {
    $.ajax({
      url: "/product/queryProductDetailList",
      type: "get",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        //console.log(info);
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
          itemTexts: function (type, page, current) {
            switch (type) {
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
          tooltipTitles: function (type, page, current) {
            //console.log(type,page,current);
            switch (type) {
              case "page":
                return "前往第" + page + "页";
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

//3.点击下架、上架按钮修改状态，摸态框,委托事件
//需求分析：点击按钮，获取按钮所在行的id，
//  var currentId;
//  var statu;
//  $("tbody").on("click", ".btn", function () {
//    //改变状态摸态框出现
//    $("#changeModal").modal("show");
//    var currentId = $(this).parent().data("id");
//    //console.log(currentId);
//    var statu = $(this).hasClass("btn-success") ? 1 : 0;
//    //console.log(statu);
//  })
//点击确认按钮，向后发送请求 改变改行的状态,无后台数据
  /*$("#sure").on("click",function(){
   $.ajax({
   url: "",
   type: "get",
   data: {
   id: currentId,
   statu: statu
   },
   dataType: "json",
   success: function(info){
   console.log(info);
   if(info.success){
   //关闭模态框，
   $("#changeModal").modal("hide");
   //重新渲染页面
   render();
   }
   }
   })
   })*/

//4.点击添加商品摸态框下拉框，发送请求，获取二级分类，渲染
  $(".dropdown").on("click", function () {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: "get",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        //console.log(info);
        //绑定模板，渲染
        $(".dropdown-menu").html(template("cataTmp", info));
      }
    })
  })
//5.给下拉框中的a注册点击事件
  $(".dropdown-menu").on("click", "a", function () {
    //点击后获取a的文本
    var txt = $(this).text();
    //把文本赋给按钮
    $("#dropdownTxt").text(txt);
    //获取当前a的id,并赋值给隐藏域
    var id = $(this).data("id");
    $("input[name='brandId']").val(id);
    //校验插件只能校验表单元素的内容，其他元素需要手动改变校验状态
    $("#form").data("bootstrapValidator").updateStatus("brandId", "VILID");
  })


//6.多文件上传插件初始化
  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, data) {
      //console.log(data.result);
      //data.result对象中包括图片的名称picName和图片地址picAddr
      //将图片对象（名称和地址）存储到数组中，每次从前面开始追加，使用数组方法
      picArr.unshift(data.result);

      //console.log(picArr.length);
      //获取图片地址
      var picUrl = data.result.picAddr;
      //将图片渲染到imgbox中给用户浏览
      $(".imgbox").prepend('<img src="' + picUrl + '" alt="" width=100 height=100 style="margin-left:10px">')
      //通过数组长度，限制图片上传的数量  <=3
      if (picArr.length > 3) {
        //从数组后边移出多余的图片对象
        picArr.pop();
        //同时从imgbox中删除掉多余的图片
        $(".imgbox img:last-of-type").remove();
      }
      //校验插件只能校验表单元素的内容，其他元素需要手动改变校验状态

      // 更新表单校验状态 picStatus 为 VALID
      if (picArr.length === 3) {
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    }
  })

//7.表单校验初始化
  //用户名、库存用正则校验
  $("#form").bootstrapValidator({
    // 对隐藏域也校验
    excluded: [],
    // 指定校验时显示的图标, 固定写法
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',      // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    //校验所有字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "商品库存必须是以非零开头的数字"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺寸"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入正确的商品尺寸"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "商品价格必须是以非零开头的数字"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "商品价格必须是以非零开头的数字"
          }
        }
      },
      //用于标记当前上传图片的总数量
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      }
    }

  })

//8.注册表单校验成功事件
  $("#form").on("success.form.bv", function (e) {
    //阻止表单的自动提交，使用ajax提交
    e.preventDefault();
    // $('#form').serialize() 只能获取设置 name的表单元素的值, 里面没有图片信息, 所以需要拼接
    var formData = $("#form").serialize();
    formData += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    formData += "$picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    formData += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
    //校验插件只能校验表单元素的内容，其他元素需要手动改变校验状态
    //向后台提交数据
    $.ajax({
      url: "/product/addProduct",
      type: "post",
      data: formData,
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          // 关闭模态框
          $('#addModal').modal("hide");
          // 页面重新渲染第一页
          currentPage = 1;
          render();
          // 9.重置表单, 内容和状态都重置
          $('#form').data("bootstrapValidator").resetForm(true);

          // 下拉框按钮和图片不是表单元素, 需要手动重置
          $('#dropdownTxt').text("请选择二级分类");
          // 移除所有的图片
          $('.imgBox img').remove();
          picArr = []; // 同步数组
        }
      }
    })
  })



})