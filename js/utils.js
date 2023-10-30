
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
/**
 * 加密
 * @param {*} str 
 * @returns 
 */
function encrypt(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
      let charCode = str.charCodeAt(i);
      result += String.fromCharCode(charCode + 1);
  }
  return result;
}

// 加密函数
function encryptAES(password, slat) {

  // 加密密钥，必须为 16、24 或 32 位，对应 AES-128、AES-192 或 AES-256
  const key = CryptoJS.enc.Utf8.parse(slat);

  // 加密向量，必须为 16 位
  const iv = CryptoJS.enc.Utf8.parse(IV);

  console.log(key,iv);

  // 进行 AES 加密
  const ciphertext = CryptoJS.AES.encrypt(password, key, { iv: iv, mode: CryptoJS.mode.CBC });
  return ciphertext.toString();
}


// 解密函数
function decryptAES(encryptedPassword, slat) {

  // 加密密钥，必须为 16、24 或 32 位，对应 AES-128、AES-192 或 AES-256
  const key = CryptoJS.enc.Utf8.parse(slat);

  // 加密向量，必须为 16 位
  const iv = CryptoJS.enc.Utf8.parse(IV);

  // 解密密钥和加密向量必须与加密时使用的相同
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

  // 将解密后的结果转换为字符串
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

  return decryptedText;
}

