var WebSocketServer = new require('ws');
var fs = require('fs');
var path = 'd:/test';



// подключенные клиенты
var clients = {};

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
	port: 8081
});

webSocketServer.on('connection', function(ws) {

	var id = Math.random();
	clients[id] = ws;
	console.log("новое соединение " + id);
	
	var message = {
		'data': { 'id': id,
		'text': 'соеденение установлено'}
	};
	
	fs.readdir(path, function(err, items) {
		message.data.list = items;
		ws.send(JSON.stringify(message));
	});
	
	ws.on('close', function() {
		console.log('соединение закрыто ' + id);
		delete clients[id];
	});

	
 
});


fs.watch(path, { persistent: true }, function(evt, file) {
		console.log("directory change");
		fs.readdir(path, function(err, items) {
						
			var message = {
				'data': { 'list': items}
			};
			
			for (var key in clients) {
				message.data.id = key;
				clients[key].send(JSON.stringify(message));
			}
			
		});
		
	});




  
	
  


