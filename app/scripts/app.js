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
				
			});
	