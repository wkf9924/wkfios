define(function () {
		"use strict";
		var factory = function ($http) {
				//var CarWashUrl="http://192.168.2.150:8080/carwash";/*夏的电脑*/
				var CarWashUrl="http://192.168.2.249:8081/carwash";/*公网*/
				var CarWashRequest=function(method,path,params){
					return $http({
							method:method,
							url:CarWashUrl+path,
							params:params
					})
				};
				return{
					runHttp:function(mothod,path,params){
						return CarWashRequest(mothod,path,params)
					}
				}
		};
		factory.$inject = ["$http"];
		return factory;
});
