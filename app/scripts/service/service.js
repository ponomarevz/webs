(function(){
'use strict';
/*jshint validthis:true */
	
	//------------сервис для получения данных по протоколу webSocet
	angular
		.module('App')
			.service('myWebSocServ', myWebSocServ);
	
	function myWebSocServ ($rootScope) {
		var curSocket = {};
		
		//-------------api метод создания сервиса--------
		this.createConection = function() {
			curSocket = new WebSocket("ws://localhost:8081");
			//---------------регистрация обработчиков--------
			//-----------обработчик создания соеденения------
						
			curSocket.onopen = function() {
				console.log("websocet conection start");
				curSocket.send(JSON.stringify({'type': 'getfolder', 'path': 'd:/test'}));
			};
			
			//--------обработчик поступления соедения--------
			curSocket.onmessage = function(message) {
				console.log(message);
				$rootScope.$broadcast('mesFromServ', JSON.parse(message.data));
			};
					
		};
		
		this.newFolder = function(folder) {
				curSocket.send(JSON.stringify({'type': 'getfolder', 'path': folder}));
		};
		
		this.deleteFile = function(path) {
			curSocket.send(JSON.stringify({'type': 'deletefile', 'path': path}));
		};
		
		this.renFile = function(oldn, newn) {
			curSocket.send(JSON.stringify({'type': 'renfile', 'oldn': oldn, 'newn': newn}));
		};
	}

})(); //------локализируем обявления функций сервисов



  
  	