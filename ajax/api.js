
// 测试环境
const baseUrl = window.location.origin+'/api';
// const baseUrl = 'http://120.76.201.118:8081';
var ajaxCount = 0;
// 请求封装
function request(url, options) {
  var Url = /^(f|ht)tps?:\/\//i.test(url)? url: baseUrl+url;
  var token = window.localStorage.getItem('token');
  var whileList = ['/user/register'];
  var headers = {"Accept": "*/*",};
  if(token!==null&&!whileList.includes(url)){
    headers.Authorization = token;
  }
  console.log('headers',headers)
  ajaxCount++;
  $.loading().show();
  try {
    $.ajax({
      url: baseUrl+url,                 // 代表请求的服务器地址
      method: options.method,       // 使用的请求方法
      headers: headers,                 // 设置请求头
      contentType:'application/json', //
      // processData:false,
      dataType:'json',
      data:options.method==='post' ? JSON.stringify(options.data): options.data, 
      // xhrFields: { withCredentials: true }, //跨域
    }).done((data) => {
      // TODO
      // console.log(data);
      if(data.code === EXPIRE_CODE){
        $.toast('token失效, 请重新登陆');
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userName');
        window.eventEmitter.emit('tokenOut');
      }else  if(data.code  === SUCCESS_CODE){
        options.done&&options.done(data);
      }else {
        options.fail&&options.fail('');
      }
        
    }).fail((xhr, status, err) => {
        console.error(xhr);
        var  errorText  =  '请求出错, 请联系管理员 '
        var responseJSON = xhr.responseJSON;
        if(!responseJSON){
          errorText = '网关错误，请联系管理员';
          
        }else if(responseJSON.code === EXPIRE_CODE){
          errorText  =  'token失效, 请重新登陆';
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('userName');
          window.eventEmitter.emit('tokenOut');
          // window.localStorage.removeItem('userInfo');
        }
        options.fail&&options.fail(errorText);
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

// 获取当前用户
function logoutApi(options) {
  var options =$.extend({method: 'post'},options);
  request('/user/logout',options);
}