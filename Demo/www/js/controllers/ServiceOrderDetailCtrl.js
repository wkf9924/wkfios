define([
    //'css!../../css/discovery/discovery.css',
    //'css!../../css/common.css'
], function () {
    'use strict';
    function ctrl($scope,$http,getfield,urlData,$location,confirmPopu,$timeout,$rootScope) {

        //获取服务订单详情
        getserviceOrderEdit();
        function getserviceOrderEdit(){
            getToken(function(token){
            $scope.token = token;
                var serviceOrderEditData = {
                    id:getfield.getIdName(),
                    token: $scope.token
                };
                $http({
                    method: "get",
                    dataType:"json",
                    url:"http://192.168.2.249:8081/carwash/my/serviceOrderInfo",
                    withCredentials:true,
                    params:serviceOrderEditData,
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
                }).success(function(response){
                    if(response.code==0){
                        $scope.service_name = response.result.service_name;
                        $scope.seller_name = response.result.seller_name;
                        $scope.seller_tel = response.result.seller_tel;
                        $scope.service_price = response.result.service_price;
                        $scope.create_time = response.result.create_time;
                        $scope.img_url = response.result.img_url;
                        $scope.id = response.result.id;
                        $scope.status = response.result.status;

                        $scope.accepter_userid = response.result.accepter_userid;
                        $scope.coupon_id = response.result.coupon_id;
                        $scope.service_id = response.result.service_id;
                        console.log("ok");
                    }else{
                        return null;
                    }
                });
            });
        }


        //删除订单
            $scope.delServiceOrder = function(){
                getToken(function(token){
                    $scope.token = token;
                    var delServiceOrderData = {
                        token: $scope.token,
                        id:getfield.getIdName(),
                        type:"1"
                    };
                    confirmPopu("确认删除").then(function(res){
                        if(res){
                            urlData.runHttp("get","/my/editService",delServiceOrderData).success(function(response){
                            //console.log("parse   result bbb:"+JSON.stringify(response));
                            //customePopu("删除成功");
                            mallPrompt("删除成功");
                            $timeout(function(){
                                $location.path('/service-order');
                                $rootScope.$broadcast("servicelist")
                            },1500)
                        })

                        }else{
                            console.log("shanchu")
                        }
                    });
                });
            };

            //取消订单
            $scope.cancelServiceOrder = function(){
                getToken(function(token){
                    $scope.token = token;
                    var cancelServiceOrderData = {
                        token: $scope.token,
                        id:getfield.getIdName(),
                        type:"2"
                    };
                    confirmPopu("确认取消").then(function(res){
                        if(res){
                            urlData.runHttp("get","/my/editService",cancelServiceOrderData).success(function(response){
                                //console.log("parse   result bbb:"+JSON.stringify(response));
                                //customePopu("取消订单成功");
                                mallPrompt("取消订单成功");
                                $timeout(function(){
                                    $location.path('/service-order');
                                    $rootScope.$broadcast("cancellist")
                                },1500)

                            })

                        }else{
                            console.log("quxiao")
                        }
                    });
                 });
            };


            //立即支付
            $scope.servicePay = function(){
                getToken(function(token){
                    $scope.token = token;
                    var servicePaydata={
                        accepter_userid:$scope.accepter_userid,
                        coupon_id:$scope.coupon_id,
                        id:getfield.getIdName(),
                        price:$scope.service_price,
                        service_id:$scope.service_id,
                        token:$scope.token,
                        type:"1"
                    };
                    goSerPay(servicePaydata.accepter_userid,servicePaydata.coupon_id,servicePaydata.id,servicePaydata.price,servicePaydata.service_id,servicePaydata.token,servicePaydata.type);
                });
            };

    }

    ctrl.$inject = ['$scope','$http','getfield','urlData','$location',"confirmPopu","$timeout",'$rootScope'];
    return ctrl;
});

