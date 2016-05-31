var testApp = angular.module('AngularPizza', ['angularUtils.directives.dirPagination']);

testApp.controller('PizzaController', function ($scope, $http) {
    /*var orders = [
    { date: 1, name_Customer: "name_Customer", surname_Customer: "surname_Customer", name_Pizza: "name_Pizza", cost: "320" },
    { date: 1, name_Customer: "name_Customer", surname_Customer: "surname_Customer", name_Pizza: "name_Pizza", cost: "320" }
    ];

    $scope.orders = orders;
    */
    $scope.serverURL = "http://localhost:64540/";
    $scope.getData = function () {
 
        var url = "api/pizza";
        var urlParams = {};
                
        $scope.Delete = function (Id) {


            $http.delete('/api/pizza' +'/'+ Id)
            .success(function (data, status, headers) {
                $scope.ServerResponse = data;
            })
            $scope.getData();
        };

        $http.get($scope.serverURL + url, { params: urlParams }).success(
            function (data, status, headers, config) {
                switch (status) {
                    case 404:
                        alert($scope.serverURL + "clients is not found!");
                        return;
                    case 500:
                        alert("Server error, call administrators please.");
                        return;
                    case 403:
                        alert("You haven't got enough permissions.");
                        return;
                    case 401:
                        alert("Here should be login form.");
                        return;
                }
                if (status != 200) {
                    alert("Server returned bad status = " + status);
                    return;
                }

                $scope.orders = data;
                
                
            }
        ).error(function () { });
        $scope.predicate = 'Cost';
        $scope.reverse = true;
        $scope.order = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
           
        };

    };
    

    /*$scope.getData = function () {
        var url = "api/pizza";



        $http.get($scope.serverURL + url).success(
            function (data) {


                $scope.orders = data.Data;
               
            }
        ).error(function () { });


    };
    */

    $scope.getData();



});
