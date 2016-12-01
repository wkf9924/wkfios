define([
    //'css!../../css/discovery/discovery.css',
    //'css!../../css/common.css'
], function () {
    'use strict';
    function ctrl($scope,urlData,getfield,$rootScope,customeLoading) {
        customeLoading.show();
        //状态说明：0:待支付，1：已支付 ，4：已完成， 5：全部

        //获取服务订单列表
        $scope.onTabSelected = function(status){
            getToken(function(token){
                $scope.token = token;
                var serviceorderdata={
                    status:status,
                    token: $scope.token
                };
                urlData.runHttp("get","/my/serviceOrderList",serviceorderdata).success(function(response){
                 customeLoading.hide();
                    if(response.code=="0"){
                        $scope.soreders = response.result;
                    }else{
                    }


                })
            });

        };

        // 删除--删除订单
        $rootScope.$on("servicelist",function(){
            $scope.soreders.splice($scope.deleteIndex,1);
        })
        // 删除--取消订单
        $rootScope.$on("cancellist",function(){
            $scope.soreders.splice($scope.deleteIndex,1);
        })

        //获取服务订单id
        $scope.serviceOrderEdit=function(id,index){
            $scope.deleteIndex=index;
            getfield.addIdName(id);
            console.log(getfield.getIdName());
        }


        //切换内容
        $scope.currentTabOne = "templates/mall/serviceorder/service-order-fwcont.html";
        $scope.btnswitchservice = function(){
            $scope.currentTabOne = "templates/mall/serviceorder/service-order-fwcont.html";
            $scope.currentTabTwo="none";
            document.getElementById("btnswitchservice").className="button button-energizedv active";
            document.getElementById("btnswitchgoods").className="button button-light";


        };
        //$scope.currentTabTwo = "templates/mall/myorder.html";
            $scope.btnswitchgoods = function(){
            $scope.currentTabTwo = "templates/mall/myorder.html";
            $scope.currentTabOne="none"
            document.getElementById("btnswitchservice").className="button button-energizedv";
            document.getElementById("btnswitchgoods").className="button button-light active";
        };


    }

    ctrl.$inject = ['$scope','urlData','getfield','$rootScope','customeLoading'];
    return ctrl;
});

