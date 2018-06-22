export function setCookie(name, value, expire) {
  var date = new Date()
  date.setSeconds(date.getSeconds() + expire)
  document.cookie = name + '=' + escape(value) + '; expire=' + date.toGMTString()
}

export function getCookie(name) {
  var cookies = document.cookie;
  var cookieArr = cookies.split("; ");
  for (var i = 0; i < cookieArr.length; i++) {
    var cook = cookieArr[i];
    var cookArr = cook.split("=");
    if (cookArr[0] == name) {
      return unescape(cookArr[1]);
    }
  }
  return null;
}

export function delCookie(name) {
  setCookie(name, '', -1)
}
