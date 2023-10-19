
/**
 * 获取url参数
 * @param {*} name 
 * @returns 
 */
function getURLParam(name) {
  var search = window.location.search.substring(1);
  var params = search.split('&');
  
  for (var i = 0; i < params.length; i++) {
      var param = params[i].split('=');
      if (param[0] === name) {
          return param[1] === undefined ? true : decodeURIComponent(param[1]);
      }
  }
  
  return null;
}