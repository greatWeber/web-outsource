
var login_type = 'login';
var token = window.localStorage.getItem('token');
var tokenCookie = $.cookie('Authorization');
// console.log(token,tokenCookie);
if(token){
  getUserInfo(true);
}

$(document).ready(function() {
  var mySwiper = initSwiper();
  triggerLoginTag();
  triggerPasswordIcon();
  onLoginSubmit();
});

function initSwiper(){
  var mySwiper = new Swiper(".swiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: false,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  console.log('initSwiper',mySwiper)
  return mySwiper;        
}

// 切换logintab
function triggerLoginTag(){
  $('#state_login .tab-item').click(function(){
    if($(this).hasClass('on')) return;
    var index = $('#state_login .tab-item').index(this);
    $(this).addClass('on').siblings().removeClass('on');
    $('#state_login .form-box').hide().eq(index).show();
    login_type = index === 0 ? 'login':'register';
    $('#loginBut').text(index === 0?'立即登录':'立即注册')

  })
}

// 切换密码框icon
function triggerPasswordIcon(){
  $('.password-icon').click(function(){
    if($(this).hasClass('open')){
      $(this).addClass('icon-yanjing-bi').removeClass('open icon-yanjing_kai');
      $(this).prev().attr('type','password');
    }else {
      $(this).addClass('open icon-yanjing_kai').removeClass('icon-yanjing-bi');
      $(this).prev().attr('type','text');
    }
  })
}

//登录校验
function onLoginSubmit(){
  $('#loginBut').click(function(){
    if(login_type === 'login'){
      // 登录逻辑
      loginCode();
    }else {
      // 注册逻辑
      registerCode();
    }
  })
}

function loginCode(){
  var username = $('.password-login .username').val();
  var password = $('.password-login .password').val();
  console.log(username, password)
  if(!username){
    $.toast('请填写用户名');
    return;
  }else if(!password){
    $.toast('请填写密码');
    return;
  }
  // TODO
  // 加密密码
  var encryptPsw = encryptAES(password,SLAT);
  console.log(encryptPsw);
  
  loginApi({
    data:{
      username: username,
      password: encryptPsw
    },
    done:function(res){
      console.log(res);
      // TODO
      if(res.code === SUCCESS_CODE){
        window.localStorage.setItem('token',res.data);
        $('.password-login .username').val('');
        $('.password-login .password').val('');
        getUserInfo();
      }
      $.toast(res.msg);
    },
    fail:function(err){
      $.toast(err || '登录失败，请联系管理员');
    },
  })
}

function registerCode(){
  var username = $('.register .username').val().trim();
  var password = $('.register .password').val().trim();
  // console.log('---'+username+'---') 
  if(!username){
    $.toast('请填写用户名');
    return;
  }else if(!password){
    $.toast('请填写密码');
    return;
  }
  // 判断密码是否符合规范
  if(!/^[a-zA-Z0-9]{6,16}$/.test(password)){
    $.toast('密码长度为6-16, 支持字母和数字的组合');
    return;
  }
  // 加密密码
  // var encryptPsw = encryptAES(password,SLAT);
  // console.log(encryptPsw);

  // return;
  // TODO
  registerApi({
    data:{
      username: username,
      password: password
    },
    done:function(res){
      console.log(res);
      // TODO
      if(res.code === SUCCESS_CODE) {
        $.toast('注册成功，请登录');
        window.localStorage.removeItem('token');
        setTimeout(function(){
          window.location.reload();
        },1000)
      }
    },
    fail:function(err){
      $.toast(err || '注册失败，请联系管理员');
    },
  })
}

function getUserInfo(flag){
  getUserInfoApi({
    done:function(res){
      console.log(res);
      // TODO
      if(res.code === SUCCESS_CODE){
        var password = decryptAES(res.data.password,SLAT);
        oldSystemLoginApi({
          loginMode:2,
          password:password,
          username:res.data.phone,
        }).done(function(res){
          console.log(res)
          if(res.retCode === 'T200'){
            if(flag){
              var r  =  window.confirm('检查到已登录,是否跳转原系统');
              if(r){
                setTimeout(function(){
                  window.location.href = window.location.origin+'/usercenter/#/'
                },1000)
              }
            }else  {
              $.toast('您已经登录，正在为你跳转...');
              setTimeout(function(){
                window.location.href = window.location.origin+'/usercenter/#/'
              },1000)
            }
            
            
          }
        }).fail(function(err){
          $.toast('登录原系统失败');
        })
      }
    },
    fail:function(err){
      $.toast(err || '获取用户信息失败');
    },
  })
}