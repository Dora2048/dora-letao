/**
 * Created by me on 2018/10/9.
 */
$(function () {
//搜索页面功能分析
//1.搜索历史记录渲染

//需求分析：从本地存储中的localStorage获取历史记录，渲染到搜索页面
//进入页面先渲染一次
  render();
// 1.1 读取历史记录
  function getHistory() {
    ////先手动添加历史记录
    //
    //  var arr = [ "ware","earet","faeawr","fawreew","erwef"];
    //  var jsonStr = JSON.stringify(arr);
    //  localStorage.setItem("search-list",jsonStr);

    var jsonStr = localStorage.getItem("search-list")||"[]";
    //console.log(jsonStr);
    var arr = JSON.parse(jsonStr);
    //console.log(arr);
    return arr;
  }

//1.2 渲染到页面
  function render() {
    var arr = getHistory();
    var htmlStr = template("tmp", {arr: arr});
    $(".lt-history").html(htmlStr);
  }


//2.清空历史记录
//需求分析：点击清空记录按钮，模态框弹出，点击取消，关闭摸态框，点击确认，清空数组同时关闭模态框
  /*摸态框使用mui框架中的组件，参数如下
   参数1：提示对话框上显示的内容
   参数2：提示对话框上显示的标题
   参数3：提示对话框上按钮显示的内容
   参数4：提示对话框上按钮显示的内容*/
  $(".lt-history").on("click", ".icon-empty", function () {
    console.log(111);
    mui.confirm("您确认要清空历史记录吗？", "温馨提示", ["取消", "确认"], function (e) {
      console.log(e);
      if (e.index == 0) {
        return;
      }
      if (e.index == 1) {
        //点击确定时，删除本次存储的localStorage
        localStorage.removeItem("search-list");
      }
      //删除后重新渲染页面
      render();
    })
  })

//3.删除单条历史记录
//需求分析：点击单条记录的删除按钮，获取当前行的index，移入对应的历史记录
  $(".lt-history").on("click", ".icon-del", function () {
    //取出数组
    var arr = getHistory();
    //获取当前行的index
    var index = $(this).data("index");
    console.log(index);
    //移出数组中相对应的项
    arr.splice(index, 1);
    //将编辑后的arr转为jsonStr
    var jsonStr = JSON.stringify(arr);
    //存储到本地localStorage
    localStorage.setItem("search-list", jsonStr);
    //重新渲染页面
    render();
  })


//4.添加历史记录
//  需求分析：点击搜索按钮，如果input为空给出提示信息，不为空，将其添加到数组的最前面，当数组长度超过10，，从数组后面删除内容
  $(".lt-main .btn-search").on("click", function () {
    //console.log(333);
    //获取input的内容
    var key = $(".lt-main .lt-search input").val().trim();
    console.log(key);
    if (key == "") {
      mui.toast('请输入搜索关键字', {duration: 'long', type: 'div'})
    }
    //取出数组
    var arr = getHistory();
    console.log(arr);
    //如果数组中含有输入项则删除，不含有输入项则添加
    if (arr.indexOf(key) != -1) {
      arr.splice(arr.indexOf(key), 1)
    }
    //如果数组长度大于10，从后边删除
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift(key);
    console.log(arr);
    //将编辑后的arr转为jsonStr
    var jsonStr = JSON.stringify(arr);
    //存储到本地localStorage
    localStorage.setItem("search-list", jsonStr);
    //重新渲染页面
    render();
    //清空input
    $(".lt-main .lt-search input").val("");
// 跳转到商品列表页
    location.href = "searchList.html?key=" + key;

  })


})