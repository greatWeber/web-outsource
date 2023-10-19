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
        <span class="nav-title">实验简介</span>
        <ul class="nav-ul">
          <li class="nav-li"><a href="${BASE_URL}/detail.html?id=1-1&name=introduction">实验教学目标,实验原理</a></li>
          <li class="nav-li">三分钟实验简介视频</li>
        </ul>
      </div>

      <div class="nav-item">
        <span class="nav-title">实验教学引导</span>
        <ul class="nav-ul">
          <li class="nav-li"><a href="${BASE_URL}/detail.html?id=2-1&name=guide">实验教学过程与实验方法,实验操作步骤</a></li>
          <li class="nav-li">八分钟教学引导视频</li>
        </ul>
      </div>

      <div class="nav-item">
        <span class="nav-title">实验环境要求</span>
        <ul class="nav-ul">
          <li class="nav-li"><a href="${BASE_URL}/detail.html?id=3-1&name=network">网络要求</a></li>
          <li class="nav-li"><a href="${BASE_URL}/detail.html?id=3-1&name=hardware">硬件要求</a></li>
          <li class="nav-li"><a href="${BASE_URL}/detail.html?id=3-1&name=system">用户操作系统要求</a></li>
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