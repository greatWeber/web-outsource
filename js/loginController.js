
var login_type = 'login';

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
  
  loginApi({
    data:{
      username: username,
      password: password
    },
    done:function(data){
      console.log(data);
      // TODO
    },
    fail:function(err){
      $.toast(err || '登录失败，请联系管理员');
    },
  })
}

function registerCode(){
  var username = $('.register .username').val();
  var password = $('.register .password').val();
  console.log(username, password)
  if(!username){
    $.toast('请填写用户名');
    return;
  }else if(!password){
    $.toast('请填写密码');
    return;
  }
  // TODO
  registerApi({
    data:{
      username: username,
      password: password
    },
    done:function(data){
      console.log(data);
      // TODO
    },
    fail:function(err){
      $.toast(err || '注册失败，请联系管理员');
    },
  })
}