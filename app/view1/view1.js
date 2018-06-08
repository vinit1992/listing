'use strict';

angular.module('myApp.view1', ['ngRoute','ngTable'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs: 'view1'
  });
}])

.controller('View1Ctrl', ['myFactory', '$scope', '$http', 'ngTableParams', '$window', '$location' ,function(myFactory, $scope, $http, ngTableParams, $window, $location) {
    var tableData = []
    var vm = this;
    vm.newData=[];
    $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10
    },{
      total:tableData.length,
      getData : function($defer,params){
          $http.get("https://web-travel-test.cc.uic.edu/countries	").then(function(response) {
              tableData = response.data;
              $defer.resolve(tableData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
              params.total(tableData.length);
          });
      }
    });



    vm.checkValidation = function(country){
      vm.selectedCountry={} = country;
      vm.index = vm.newData.indexOf( vm.selectedCountry);
      if(vm.index == -1) {
        vm.newData.push( vm.selectedCountry);
      }
      else{
        vm.newData.splice(vm.index, 1);
      }

      if( vm.selectedCountry.threatLevel==3 || vm.selectedCountry.threatLevel == 4)
        $window.alert( vm.selectedCountry.threatText);
     
    }
    vm.addCountry = function(newCountry){
      vm.newData.push(newCountry);
      myFactory.set(vm.newData);
      $location.path('/view2');
    }
}])

.factory('myFactory', function () {
    var vm= this;
    vm.saveData={};
    return {
      set:function (data) {
        vm.saveData = data;
      },
      get:function () {
        return vm.saveData;
      }
    };
  
 })
