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
				curSocket.send('d:/test');
			};
			
			//--------обработчик поступления соедения--------
			curSocket.onmessage = function(message) {
				console.log('onmesage');
				console.dir(JSON.parse(message.data));
				$rootScope.$broadcast('mesFromServ', JSON.parse(message.data));
			};
					
		};
		
		this.newFolder = function(folder) {
				curSocket.send(folder);
		};
	}
		
		
	
})(); //------локализируем обявления функций сервисов



  
  	