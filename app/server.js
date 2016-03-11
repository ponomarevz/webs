'use strict';
var WebSocketServer = new require('ws');
var fs = require('fs');
var path = require("path");
var pat = 'd:/test';

/*-----------
	items список содержимого дирректорииж
	return список содержащий объект описывющий каждый элемент директории
	- name имя елемента
	- full полный путь до элемента
	- type тип (true - файл, false - директория)
-----------*/
function createlist(items, pat) {
		var list = [];
		items.map(function (file) {
			var full = path.join(pat, file);
			var it = {
				'name': file, 
				'full': full};
			return it;
		}).forEach(function (it) {
			
			var stat = fs.statSync(it.full);
			it.type = stat.isFile();
			it.size = stat.size;
			it.bt = stat.birthtime;
			it.ct = stat.ctime;
			list.push(it);
			console.log(stat);
		});
		return list;
	}



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
	
	var mes = {
		'data': { 'id': id,
		'text': 'соеденение установлено'}
	};
	
	ws.on('message', function(message) {
		console.log('получено сообщение ' + message);
		
		fs.readdir(message, function(err, items) {
		
			mes.data.list = createlist(items, message);
			ws.send(JSON.stringify(mes));
		});
    });
	
	ws.on('close', function() {
		console.log('соединение закрыто ' + id);
		delete clients[id];
	});

	
 
});


fs.watch(pat, {'recursive': true}, function(evt, file) {
		console.log("directory change " + file);
		fs.readdir(pat, function(err, items) {
			
			var list = createlist(items, pat);	
			var message = {
				'data': { 'list': list}
			};
			
			for (var key in clients) {
				message.data.id = key;
				clients[key].send(JSON.stringify(message));
			}
			
		});
		
	});

	


  
	
  


