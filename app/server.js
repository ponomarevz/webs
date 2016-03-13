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
			//console.log(stat);
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
		'id': id,
		'text': 'соеденение установлено',
		'data': {}
	};
	
	ws.on('message', function(message) {
		console.log('получено сообщение ' + message);
		var message = JSON.parse(message);
		if (message.type == 'getfolder') {
			fs.readdir(message.path, function(err, items) {
				if (err) { throw err; };
				mes.data.list = createlist(items, message.path);
				ws.send(JSON.stringify(mes));
			});
		} 
		if (message.type == 'deletefile') {
			console.log(message.path);
			fs.exists(message.path, function(exists) {
				if(exists) {
					fs.unlink(message.path);
				} else { console.log('что то не так файл не существует');}
			});
		}
		if (message.type == 'renfile') {
			console.log(message.newn);
			fs.exists(message.oldn, function(exists) {
				if(exists) {
					fs.rename(message.oldn, message.newn);
				} else { console.log('что то не так файл не существует');}
			});
		}
		
    });
	
	ws.on('close', function() {
		console.log('соединение закрыто ' + id);
		delete clients[id];
	});

	
 
});


fs.watch(pat, function(evt, file) {
		console.log("directory change " + pat + "   " + file);
		if (evt) {
			console.dir(evt);
				//throw evt;
		};
		fs.readdir(pat, function(err, items) {
			if (err) { throw err; };
			var list = createlist(items, pat);	
			var message = {
				'data': { 'list': list}
			};
			
			for (var key in clients) {
				message.id = key;
				clients[key].send(JSON.stringify(message));
			}
			
		});
		
	});
