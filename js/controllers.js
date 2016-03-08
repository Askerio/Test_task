'use strict'
/* Controllers */
var teamApp = angular.module('teamApp', []);

teamApp.controller('playersListCtrl',['$scope','$http', function($scope, $http) {
    //  Get data from json file
    $http.get('data/data.result.json').success(function(data, status, headers, config) {
        $scope.result = data;
        $scope.players = data.players;
    });

    //  Set count for "Show more" button
    $scope.playersCount = 50;
    $scope.showMore = function(count){
    	$scope.playersCount += count;
    	console.log($scope.playersCount);
    }
}]);
