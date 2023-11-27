var headerTemplate = `
<div class="header login-header" style="display: block;">
<div class="header_container">
  <a href="${BASE_URL}" class="logoBox">
    <img class="logo" src="./images/logo.png">
    <span class="logo-text">电力市场虚拟仿真实验教学平台</span>
  </a>
  <div class="nav clearfix">
    <div class="nav-left">
      <div class="nav-item">
        <span class="nav-title" data-id="1">实验简介</span>
        <ul class="nav-ul">
          <li class="nav-li" data-id="1-1"><a href="${BASE_URL}/detail.html?id=1-1&name=introduction">实验教学目标</a></li>
          <li class="nav-li" data-id="1-2"><a href="${BASE_URL}/detail.html?id=1-2&name=introduction2">实验原理</a></li>
        </ul>
      </div>

      <div class="nav-item">
        <span class="nav-title" data-id="2">实验教学引导</span>
        <ul class="nav-ul">
          <li class="nav-li" data-id="2-1"><a href="${BASE_URL}/detail.html?id=2-1&name=guide">实验教学过程与实验方法</a></li>
          <li class="nav-li" data-id="2-2"><a href="${BASE_URL}/detail.html?id=2-2&name=guide2">实验操作步骤</a></li>
        </ul>
      </div>

      <div class="nav-item">
        <span class="nav-title" data-id="3">实验环境要求</span>
        <ul class="nav-ul">
          <li class="nav-li" data-id="3-1"><a href="${BASE_URL}/detail.html?id=3-1&name=network">实验环境要求</a></li>
         
        </ul>
      </div>

      <div class="nav-item">
        <span class="nav-title" data-id="4">教学特色</span>
        <ul class="nav-ul">
          <li class="nav-li" data-id="4-1"><a href="${BASE_URL}/detail.html?id=4-1&name=feature">实验教学特色</a></li>
          
        </ul>
      </div>
      
    </div>
    <div class="nav-right pull-right">
      <div class="changeLang"><a class="lang-title" href="${BASE_URL}"><i class="iconfont icon-home"></i>首页
      </a></div>
      <div class="changeLang"  ><a id="loginSystem" class="lang-title" href="javascript:;">启动实验
      </a></div>
      <div class="changeLang" id="loginRegister"  ><a  class="lang-title" href="javascript:;">注册/登录
      </a></div>
      <div class="changeLang" id="userInfo"  ><a id="logout"  class="lang-title" href="javascript:;">退出登录
      </a></div>
      <!--
      <div class="changeLang before"><span id="userInfo" class="lang-title"></span>
        <div class="lang-select">
          <a href="javascript:;" id="logout" data-lang="CN" class="lang-item active" id="changeLangZh">退出登录</a>
        </div>
      </div>
      -->
    </div>

  </div>
</div>
</div>

<div class="login-wrapper">
           
  <div class="login" id="state_login">
    <img src="./images/close.png" alt="close" class="login-close" />
    <div class="tab">
      <span class="tab-item on">登录</span>
      <span class="tab-item ">注册</span>
    </div>
    <form class="login_form" id="loginForm" onsubmit="return false;">
      <div class="password-login form-box">
        <div class="login_item">
          <i class="iconfont ipt-icon icon-yonghu"></i>
          <input class="ipt username"  type="text"
            autocomplete="off" name="phone" placeholder="用户名" required="true" autofocus="true">
        </div>
        <div class="login_item">
          <i class="iconfont ipt-icon icon-ziyuan"></i>
          <input class="ipt password" 
            type="password" autocomplete="off" name="password" placeholder="密码" required="true"><i
            class="iconfont password-icon icon-yanjing-bi"></i>
        </div>
      </div>

      <div class="register form-box hide">
        <div class="login_item">
          <i class="iconfont ipt-icon icon-yonghu"></i>
          <input class="ipt username"  type="text"
            autocomplete="off" name="phone" placeholder="用户名" required="true" autofocus="true">
        </div>
        <div class="login_item">
          <i class="iconfont ipt-icon icon-ziyuan"></i>
          <input class="ipt password" 
            type="password" autocomplete="off" name="password" placeholder="密码" required="true"><i
            class="iconfont password-icon icon-yanjing-bi"></i>
        </div>
      </div>
    </form>
    <div class="login_btn" id="loginBut">立即登录</div>
  </div>
  </div>
`;

$('#north').html(headerTemplate);
getMenuHighlight();
$('#loginSystem').click(function(){
  getUserInfo(true);
})
$('#logout').click(function(){
  logout();
});

$('#loginRegister').click(function(){
  $('.login-wrapper').toggle(); 
})

var userName  = window.localStorage.getItem('userName');
if(userName){
  $('#userInfo').show();
}else {
  $('#userInfo').hide();
}

window.eventEmitter.on('tokenOut',function(){
  $('#loginSystem').hide();
  $('#userInfo').hide();
});

function getMenuHighlight(){
  var id =  getURLParam('id');
  console.log(id);
  if(!id) return;
  $('.nav-li').each(function(){
    console.log($(this).attr('data-id'))
    if($(this).attr('data-id') == id) {
      $(this).addClass('nav-li_active');
      $(this).parent().prev('.nav-title').addClass('nav-active')
    }
  })
}

function getUserInfo(flag){
  var token = window.localStorage.getItem('token');
  if(!token){
    $.toast('请先登录');
    return;
  }
  getUserInfoApi({
    done:function(res){
      console.log(res);
      // TODO
      if(res.code === SUCCESS_CODE){
        window.localStorage.setItem('userName',res.data.username);
        $('#userInfo').show();
        if(!flag)  return;
        var password = decryptAES(res.data.password,SLAT);
        oldSystemLoginApi({
          loginMode:2,
          password:password,
          username:res.data.phone,
        }).done(function(res){
          console.log(res)
          if(res.retCode === 'T200'){
            $.toast('您已经登录，正在为你跳转...');
              setTimeout(function(){
                window.location.href = window.location.origin+'/usercenter/#/'
              },1000)
            // if(flag){
              // var r  =  window.confirm('检查到已登录,是否跳转原系统');
              // if(r){
              //   setTimeout(function(){
              //     window.location.href = window.location.origin+'/usercenter/#/'
              //   },1000)
              // }
              
            // }
            
            
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

function logout(){
  logoutApi({
    done:function(res){
      if(res.code === SUCCESS_CODE){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userName');
        window.eventEmitter.emit('tokenOut');
      }
    },
    fail:function(err){
      $.toast(err );
    },
  })
}