var http = require('http');
var https = require('https');
var url = require('url');
 
http.createServer(function(reqFrom, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('ok');
    // 解析 url 参数
    var urlGet = url.parse(reqFrom.url, true).query;
	
	if(!urlGet.url){
		return false;
	}
	
	var options = url.parse(urlGet.url, true);
	console.log(options);
	//return false;
    
	console.log('ok1');
	
	var d = new Date();
	var timeS = d.getTime();
	

	// 处理响应的回调函数
	var callback = function(response){
		// 不断更新数据
		var body = '';
		response.on('data', function(data) {
			body += data;
		});
   
		response.on('end', function() {
			// 数据接收完成
			var d = new Date();
			var timeE = d.getTime();
			console.log(body);
			console.log(timeE-timeS+'ms');
		});
	}
	// 向服务端发送请求
	if(options.protocol=='https:'){
		var reqTo = https.request(options, callback);
	}else{
		var reqTo = http.request(options, callback);
	}
	
	reqTo.end();
 
}).listen(3000);
