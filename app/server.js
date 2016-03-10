var WebSocketServer = new require('ws');
var watch = require('node-watch');
var fs = require('fs');



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
		'id': id,
		'text': 'соеденение установлено'
	};
  
	ws.on('message', function(message) {
		console.log('получено сообщение ' + message);

		for (var key in clients) {
			clients[key].send(message);
		}
	});
	
	ws.on('close', function() {
		console.log('соединение закрыто ' + id);
		delete clients[id];
	});

	ws.send(JSON.stringify(message));
 
});


watch('d:/11111/', function(filename) {
  console.log(filename, ' changed.');
  
	fs.readdir("/", function(err, items) {
		console.log(items);
 
		for (var i=0; i<items.length; i++) {
			console.log(items[i]);
		}
	});
  
});

