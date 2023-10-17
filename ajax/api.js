
// 测试环境
const baseUrl = window.location.origin+'/api';
// const baseUrl = 'http://120.76.201.118:8081';
var ajaxCount = 0;
// 请求封装
function request(url, options) {
  var Url = /^(f|ht)tps?:\/\//i.test(url)? url: baseUrl+url;
  var token = window.localStorage.getItem('token');
  var whileList = ['/user/register'];
  ajaxCount++;
  $.loading().show();
  try {
    $.ajax({
      url: baseUrl+url,                 // 代表请求的服务器地址
      method: options.method,       // 使用的请求方法
      headers: {
        Authorization: whileList.includes(url)?null: token,
        "Accept": "*/*",
        // "Connection": "keep-alive"
      },                 // 设置请求头
      contentType:'application/json', //
      // processData:false,
      dataType:'json',
      data:options.method==='post' ? JSON.stringify(options.data): options.data, 
      // xhrFields: { withCredentials: true }, //跨域
    }).done((data) => {
      // TODO
        options.done&&options.done(data);
    }).fail((xhr, status, err) => {
        console.error(xhr);
        var responseJSON = xhr.responseJSON;
        if(responseJSON.code === EXPIRE_CODE){
          window.localStorage.removeItem('token');
          // window.localStorage.removeItem('userInfo');
        }
        options.fail&&options.fail('token超时');
    }).always((data, status) => {
     
    });
  } catch (error) {
    
  } finally {
    ajaxCount--;
    console.log('ajaxCount',ajaxCount);
    if(ajaxCount===0){
      $.loading.hide();
      // setTimeout(function(){
        
      // },1000)
      
    }
    options.always&&options.always(data);
  }
  
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

// 获取当前用户
function getUserInfoApi(options) {
  var options =$.extend({method: 'get'},options);
  request('/user/nowUser',options);
}

function oldSystemLoginApi(data) {
  // var options =$.extend({method: 'post'},options);
  // request('http://10.126.156.163/usercenter/web/login',options);
  return $.post('/usercenter/web/login',data);
}