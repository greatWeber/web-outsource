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
          <li class="nav-li" data-id="1-1"><a href="${BASE_URL}/detail.html?id=1-1&name=introduction">实验教学目标,实验原理</a></li>
          <li class="nav-li" data-id="1-2"><a href="${BASE_URL}/detail.html?id=1-2&name=introVideo">三分钟实验简介视频</a></li>
        </ul>
      </div>

      <div class="nav-item">
        <span class="nav-title" data-id="2">实验教学引导</span>
        <ul class="nav-ul">
          <li class="nav-li" data-id="2-1"><a href="${BASE_URL}/detail.html?id=2-1&name=guide">实验教学过程与实验方法,实验操作步骤</a></li>
          <li class="nav-li" data-id="2-2"><a href="${BASE_URL}/detail.html?id=2-2&name=guideVideo">八分钟教学引导视频</a></li>
        </ul>
      </div>

      <div class="nav-item">
        <span class="nav-title" data-id="3">实验环境要求</span>
        <ul class="nav-ul">
          <li class="nav-li" data-id="3-1"><a href="${BASE_URL}/detail.html?id=3-1&name=network">网络要求</a></li>
          <li class="nav-li" data-id="3-2"><a href="${BASE_URL}/detail.html?id=3-2&name=hardware">硬件要求</a></li>
          <li class="nav-li" data-id="3-3"><a href="${BASE_URL}/detail.html?id=3-3&name=system">用户操作系统要求</a></li>
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
      <div class="changeLang"><a class="lang-title" href="${BASE_URL}">登录/注册
      </a></div>
      <div class="changeLang before"><span class="lang-title">Language</span>
        <div class="lang-select">
          <a href="javascript:;" data-lang="CN" class="lang-item active" id="changeLangZh">简体中文</a>
        </div>
      </div>
    </div>

  </div>
</div>
</div>
`;

$('#north').html(headerTemplate);
getMenuHighlight();

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