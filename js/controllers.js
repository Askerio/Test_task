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
    }

    // Function for calculate proj

    $scope.changeInput = function(player){
    	// Set value to variable
    	$scope.minutes = player.projectedStats.minutes.default;
    	$scope.ur = player.projectedStats.usageRate.default;
    	$scope.rr = player.projectedStats.reboundRate.default;
    	$scope.ar = player.projectedStats.assistsRate.default;
    	$scope.manEu = player.manualEffAdj.old;   
    	//  Create array for get max value of ur, rr, ar
    	// Clear array
    	$scope.rateArr = [];    	
    	//  Add to array actual value
    	$scope.rateArr.push($scope.ur, $scope.rr, $scope.ar);
    	//  Get max
	    $scope.maxR = Math.max.apply(null, $scope.rateArr)
	    //  Calculate proj and round it to 4 symbols after "."
    	player.draftkings.projection.new = Math.round(($scope.minutes * $scope.manEu * ($scope.ur + $scope.rr + $scope.ar) / 3 / $scope.maxR) * 10000) / 10000;
    }

    // Function for orders
    $scope.reverse = true;
    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
        $scope.sortable = true;        
    };
}]);
