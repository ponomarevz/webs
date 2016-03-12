'use strict';

	angular.module('App', []);
	
		angular.module('App').
			controller('main', function(myWebSocServ, $scope) {
				myWebSocServ.createConection();
				$scope.id = "none";
				
				$scope.$on('mesFromServ', function(event, args) {
								
						$scope.id = args.data.id;
						$scope.message = args.data.text;
						$scope.list = args.data.list;
					
					$scope.$apply();
				});
				
				$scope.goTo = function(item) {
					if (item.type === false) {
						myWebSocServ.newFolder(item.full);
					}
				};
				
				$scope.fileDelet = function(full) {
					//----todo на сервере и сервис dele
					alert("dele full " + full)
				};
				
			});
	