const baseUrl = 'http://127.0.0.1';
var ajaxCount = 0;
// 请求封装
function request(url, options) {
  ajaxCount++;
  $.loading().show();
  $.ajax({
    url: baseUrl+url,                 // 代表请求的服务器地址
    method: options.method,       // 使用的请求方法
    headers: {},                 // 设置请求头
    contentType:'application/json', //
    data: options.data, 
  }).done((data) => {
      options.done&&options.done(data);
  }).fail((xhr, status, err) => {
      console.error(err);
      options.fail&&options.fail(err);
  }).always((data, status) => {
    ajaxCount--;
    if(ajaxCount===0){
      $.loading.hide();
    }
    options.always&&options.always(data);
  });
};

// 登录
function loginApi(options) {
  var options =$.extend({method: 'post'},options);
  request('/user/login',options);
}

// 注册
function registerApi(options) {
  var options =$.extend({method: 'post'},options);
  request('/user/register',options);
}