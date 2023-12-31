
var login_type = 'login';
var token = window.localStorage.getItem('token');
var tokenCookie = $.cookie('Authorization');
// console.log(token,tokenCookie);

window.eventEmitter.on('tokenOut',function(){
  $('#loginRegister').show();
});


$(document).ready(function() {  
  // var mySwiper = initSwiper();
  triggerLoginTag();
  triggerPasswordIcon();
  triggerVideoTab();
  onLoginSubmit();
  if(token){
    // getUserInfo(true);
    $('#loginRegister').hide();
    $('#loginSystem').show();
  }else  {
    $('#loginSystem').hide();
  }
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

  $('.login-close').click(function(){
    $('.login-wrapper').toggle();
  })

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

// 切换密码框icon
function triggerVideoTab(){
  $('.video-tab .tab-item').click(function(){
    if($(this).hasClass('tab-active')) return;
    var index = $('.video-tab .tab-item').index(this);
    $(this).addClass('tab-active').siblings().removeClass('tab-active');
    $('.video-box .video').hide().eq(index).show();
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
        $('#loginRegister').hide();
        $('#loginSystem').show();
        $('.login-wrapper').toggle(); 

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

