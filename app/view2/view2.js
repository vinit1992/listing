'use strict';

angular.module('myApp.view2', ['ngRoute','ngTable'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl',
    controllerAs:'view2'
  });
}])

.controller('View2Ctrl', ['myFactory','$scope','ngTableParams','$location', function(myFactory, $scope, ngTableParams, $location) {
  var vm=this;
  vm.data = myFactory.get();
  var tableData = []
    $scope.tableParams = new ngTableParams({
      page: 1,
      count: 10
    },{
    total:tableData.length, 
    getData : function($defer,params){
        
            tableData = vm.data;
            $defer.resolve(tableData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            params.total(tableData.length);
        
    }
  });
  vm.back = function(){
    $location.path('/view1');
  }


}]);