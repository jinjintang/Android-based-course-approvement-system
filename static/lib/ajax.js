/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式，默认使用GET
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
function ajax(opt) {
   
　　opt = opt || {};

　　var type = opt.type || 'GET';
　　type = type.toUpperCase() || 'GET';
　　var url = opt.url || '';
　　var async = opt.async || true;
　　var data = opt.data || null;
　　var success = opt.success || function () {};
    var fn = opt.fn || function () {};
　　var xmlHttp = null;
　　if (XMLHttpRequest) {
　　　　xmlHttp = new XMLHttpRequest();
　　}
　　else {
　　　　xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
　　}


　　if (type === 'POST' || type === 'PUT') {
	    data=JSON.stringify(data);
　　　　xmlHttp.open(type, url, async);
　　　　xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=utf-8');      
        // xmlHttp.setRequestHeader('Authorization',temp_token);
　　　　xmlHttp.send(data);
       xmlHttp.onload = function () {
　　　
      var res=JSON.parse(xmlHttp.responseText);  
　　　　　　     fn(res);
　　　　
　　};
　　}
   else if (type==='DELETE') 
    	{
         xmlHttp.open(type, url, async);
         xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=utf-8,X-HTTP-Method-Override: DELETE');      
         // xmlHttp.setRequestHeader( "X-HTTP-Method-Override","DELETE");
         console.log(url);
　　　　 xmlHttp.send(null);  
         xmlHttp.onload = function () {
　　　
     
　　　　　　     fn(xmlHttp.responseText);
　　　　
　　};
    	}
　　else {
            if(data!=null){
             var params = [];
　　             for (var key in data){

　　　　         params.push(key + '=' + data[key]);
　　          }   
　　         var dataStr = params.join('&');
             　  xmlHttp.open(type, url+ '?' + dataStr, async);
             }
             else{
             	　xmlHttp.open(type, url, async);
             }	 　　　
        xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=utf-8');  
     
        // xmlHttp.setRequestHeader('Authorization',temp_token);
　　　　xmlHttp.send(null);
　　} 
　　xmlHttp.onreadystatechange = function () {
　　　　if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
	         var res=JSON.parse(xmlHttp.responseText);  
　　　　　　     success(res);
　　　　}
　　};
}

function upFile(opt){

     var url = opt.url || '';
	 var data = opt.data || null;
     var success=opt.success || function(){};
     var uploadState=opt.uploadState || function(){};　
     var xmlHttp = null;
　　if (XMLHttpRequest) {
　　　　xmlHttp = new XMLHttpRequest();
　　}
　　else {
　　　　xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
　　}
    xmlHttp.open('POST', url, true);
    xmlHttp.upload.addEventListener("progress", uploadState, false);

		
　  xmlHttp.send(data);

    xmlHttp.onreadystatechange = function () {
　　　　if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
	         var res=xmlHttp.responseText;  
　　　　　　     success(res);
　　　　}
　　};


}
function upLoadFile(opt){

     var url = opt.url || '';
     var success=opt.success || function(){};
     var uploadState=opt.uploadState || function(){};
     var errortip=opt.errortip ||  function(){};　　
     var xmlHttp = null; 
　　if (XMLHttpRequest) {
　　　　xmlHttp = new XMLHttpRequest();
　　}
　　else {
　　　　xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
　　}
    xmlHttp.open('GET', url, true);
    xmlHttp.responseType = 'blob';
    xmlHttp.addEventListener("progress", uploadState, false);
    xmlHttp.addEventListener("error", errortip, false);         
　  xmlHttp.send(null);

    xmlHttp.onreadystatechange = function () {
　　　　if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
             var res=xmlHttp.response;  
　　　　　　     success(res);
　　　　}
　　};


}
 

export {ajax,sev_url,oss_url,upFile,upLoadFile}

