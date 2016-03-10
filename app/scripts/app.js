'use strict';

	angular.module('App', []);
	
		angular.module('App').
			controller('main', function(myWebSocServ, $scope) {
				myWebSocServ.createConection();
				$scope.id = "none";
				$scope.$on('mesFromServ', function(event, args) {
					console.log("werwer " + args.id);
					$scope.id = args.id;
					$scope.message = args.text;
					$scope.$apply();
				});
				
			});
	