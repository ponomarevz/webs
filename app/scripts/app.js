'use strict';

	angular.module('App', []);
	
		angular.module('App').
			controller('main', function(myWebSocServ, $scope) {
				myWebSocServ.createConection();
				$scope.it;
				$scope.id = "none";
				$scope.fullName;
				
				$scope.$on('mesFromServ', function(event, args) {
								
						$scope.id = args.id;
						$scope.message = args.text;
						$scope.list = args.data.list;
					
					$scope.$apply();
				});
				
				$scope.goTo = function(item) {
					if (item.type === false) {
						myWebSocServ.newFolder(item.full);
					}
				};
				
				$scope.fileDelet = function(full) {
					myWebSocServ.deleteFile(full);
				};
				
				$scope.openfile = function(item) {
					//-------пока просто для демонстрации------------
					//window.location.href = item.full;
					$scope.fullName = item.full;
					$scope.it = item;
				};
				
				$scope.renFile = function(oldn, newn) {
					myWebSocServ.renFile(oldn, newn);
				}
				
				$scope.itemShow = function(item) {
					return $scope.it === item ? true : false;
				}
				
			});
	