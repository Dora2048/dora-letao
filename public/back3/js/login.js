//表单校验功能，使用bootstarapValidator 插件，该插件基于bootstrap框架
$(function () {
  //1.bootstrapValidator 初始化
  //使用表单校验插件
  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [':disabled', ':hidden', ':not(:visible)'],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          callback: {
            message: '用户名不存在',
          }
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
          callback: {
            message: '密码错误'
          }
        }
      },
    }
  })

  //2.登录功能
  //需求分析：表单校验成功后触发表单校验成功函数，发送请求，向后台查询用户名和密码的正确与否，若正确跳转到index页面，
  $("#form").on('success.form.bv', function (e) {
    //禁止表单自动提交功能
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url: "/employee/employeeLogin",
      type: "post",
      dataType: "json",
      //通过表单序列化快速获取当前数据，发送给后台
      data: $("#form").serialize(),
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = "index.html";
        }
        //1000  用户名不存在
        //1001  密码错误
        if (info.error === 1000) {
          //获取validator实例，调用updataStatus方法，获取字段状态，给出提示信息
          $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
        }
        if (info.error === 1001) {
          //获取validator实例，调用updataStatus方法，获取字段状态，给出提示信息
          $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
        }

      }

    })

  })


  //3.表单重置功能
  //需求分析：表单自带的重置功能，只能重置内容，不能重置状态，可在插件中调用重置方法，达到目的
  $("button[type='reset']").on("click",function(){
    $("#form").bootstrapValidator("resetForm");
    //$("#form").data("bootstrapValidator").resetForm();
  })
})