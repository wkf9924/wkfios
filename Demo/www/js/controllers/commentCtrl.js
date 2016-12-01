define(function () {
    'use strict';
    	function ctrl($scope,CarWashRequest,getGoodList,getTokenR,$ionicHistory,$state,$log,$stateParams,customePopu,$timeout,customeLoading) {
          	/*没有定义数组长度为1 接口获取我的订单*/
    		$scope.commentList=getGoodList.getGoods();
    		
    		
    		/*发送数据参数 双向绑定*/
    		creatSentParas();
    		
    		//console.log($ionicHistory.viewHistory())
    		/*订单id*/
    		//$scope.snedParas.order_deorder_details=[];
    		/*发送参数*/
    		$scope.goParas=function(){
                //alert($scope.sendParas)
    			// console.log($scope.sendParas);
    			// /*参数的有效验证*/
    			// /*物流服务或者服务态度没有打分的验证*/
    			
    			if(angular.isUndefined($scope.sendParas.log_service)||angular.isUndefined($scope.sendParas.que_service) ){
    				/*customePopu("物流服务或者服务态度还没有打分,请打分");*/
                    mallPrompt("物流服务或者服务态度还没有打分,请打分");
    				return;
    			};

    			for(var i=0;i<$scope.sendParas.order_details.length;i++){
    				if(angular.isUndefined($scope.sendParas.order_details[i].eva_content)){
                        mallPrompt("还没有写下评价内容")
    					return;
    				}else if(angular.isUndefined($scope.sendParas.order_details[i].pro_evaluate)){
                        mallPrompt("还没有为相符程度打分")
    					return;
    				}
    			}
    			var copy=angular.copy($scope.sendParas,{});
    			copy.order_details=angular.toJson(copy.order_details);
    			console.log(copy);
    			customeLoading.show();
    			CarWashRequest.runHttp("get","/my/saveEvaluate",copy).success(function(response){
        			console.log(response);
        			if(response.code===0){
        				/*回跳原来的页面*/
        				/*customePopu("提交成功");*/
        				customeLoading.hide();
        				mallPrompt("评论成功");
        				$timeout(function(){
        					$ionicHistory.goBack(-1);
        				},1000)
        			}
        		}).error(function(response) {
        			/*错误处理*/
        			/* Act on the event */
        			console.log(response);
              		customeLoading.hide();
              		mallPrompt("网络连接失败")
        		});
    		}
        	
        	/*创建发送参数*/
        	function creatSentParas(){
        		var attrArr=["id","order_prodcut_id"];
        		$scope.sendParas={};
        		$scope.sendParas.order_details=[];
                getToken(function(token){
                    $scope.sendParas.token=token;
                })
        		$scope.sendParas.order_id=$scope.commentList[0].order_id;
        		angular.forEach($scope.commentList[0]["order_details"], function(value){
        			var obj={};
        			angular.forEach(attrArr,function(attr){
        				obj[attr]=value[attr]
        			});
        			$scope.sendParas.order_details.push(obj)
        		});
        	}
  	}
    ctrl.$inject = ['$scope',"CarWashRequest",'getGoodList',"getTokenR","$ionicHistory","$state","$log","$stateParams","customePopu","$timeout","customeLoading"];//顺序
    return ctrl;
});



