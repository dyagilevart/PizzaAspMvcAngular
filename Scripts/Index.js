var testApp = angular.module('AngularPizza', ['angularUtils.directives.dirPagination']);

testApp.controller('PizzaController', function ($scope, $http) {
    var menu = [
    { Id: 1, name: "Европейская" },
    { Id: 2, name: "Стрета" },
    { Id: 3, name: "Пранзо" },
    ];
    $scope.menu = menu;
    var customers = [
        { Id: 1, name: "Денис Дягилев" },
        { Id: 2, name: "Наталья	Польшакова" },
        { Id: 3, name: "Антон Белоусов" },
        { Id: 4, name: "1	1" },
        { Id: 5, name: "1	1" },
        { Id: 6, name: "1	1" },
        { Id: 7, name: "1	1" },
        { Id: 8, name: "12	12" },
        { Id: 9, name: "123	123" },
        { Id: 10, name: "Иван	Иванов" },
        { Id: 11, name: "вйцв	Фыва" },
        
    ];
    $scope.customers = customers;
    
    $scope.serverURL = "http://localhost:64540/";
    $scope.getData = function () {
 
        var url = "api/pizza";
        var urlParams = {};


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
        $scope.predicate = 'Date';
        $scope.reverse = true;
        $scope.order = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;

           
        };

    };
    $scope.Delete = function (Id) {


        $http.delete('/api/pizza' + '/' + Id)
        .success(function (data, status, headers) {
            $scope.ServerResponse = data;
            $scope.getData();
        })
        
    };

    $scope.Save = function (Id_pizza, Id_customer) {
        var dataObj = {
            Id_pizza: Id_pizza,
            Id_customer: Id_customer,

        };
        var res = $http.post('/api/pizza', dataObj);
        res.success(function (data, status, headers, config) {
            $scope.message = data;
            $scope.getData();
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({ data: data }));
        });
        //alert(Id_pizza + " " + Id_customer);
        $scope.showPopUpDialog = false;
        
    };

    $scope.Edit = function (Id, Id_pizza) {
        var dataObj = {
            Id_pizza: Id_pizza,
        };
        var res = $http.put('/api/pizza' + '/' + Id, dataObj);
        res.success(function (data, status, headers, config) {
            $scope.message = data;
            $scope.getData();
        });
        res.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({ data: data }));
        });
        //alert(Id_pizza + " " + Id_customer);
        $scope.showPopUpDialog2 = false;
        $scope.sMenu.Id = "";
    };

    $scope.getData();



    $scope.Dialog = function () {
        $scope.popUpDialogContent = 'Сохранить заказ?';
        $scope.popUpDialogCallback = 'Save';
        $scope.showPopUpDialog = true;

    }
    $scope.Dialog2 = function (Id, Name, Surname, Id_pizza) {
        $scope.popUpDialogContent2 = 'Изменить заказ?';
        $scope.popUpDialogCallback2 = 'Edit';
        $scope.showPopUpDialog2 = true;
        $scope.customer = Name + " " + Surname;
        $scope.order_Id = Id;
        $scope.sMenu = Id_pizza;
    }
});

testApp.directive('popUpDialog', function()
{
    return {
        restrict: 'E',
        scope: false,
        template: '<div id="popUpDialog-bg" ng-show="showPopUpDialog"> \
         <div id="popUpDialog"> \
          <div class="content">{{ popUpDialogContent }}</div> \
          <div class="clearfix buttons-container"> \
            <div>\
            <select  ng-model="sMenu.Id"  \
            ng-options="men.Id as men.name for men in menu">>\
            </select >\
            </div>\
            <div>\
           <select  ng-model="sCustomer.Id"  \
            ng-options="i.Id as i.name for i in customers">>\
            </select >\
            </div>\
            <div class="pull-left"> \
              <button class="btn btn-primary" ng-click="Save(sMenu.Id, sCustomer.Id)">Да</button> \
            </div> \
            <div class="pull-right"> \
              <button class="btn btn-warning" ng-click="closePopUpDialog()">Нет</button> \
            </div> \
          </div> \
          </div> \
        </div>',
        controller: function( $scope ) 
        {

            $scope.showPopUpDialog = false;

            $scope.closePopUpDialog = function() 
            {
                $scope.showPopUpDialog = false;
            }

            $scope.popUpDialogApprove = function() 
            {
                $scope[$scope.popUpDialogCallback]();
                $scope.showPopUpDialog = false;
            }
        }
    }
})

testApp.directive('popUpDialogEdit', function () {
    return {
        restrict: 'E',
        scope: false,
        template: '<div id="popUpDialog-bg" ng-show="showPopUpDialog2"> \
         <div id="popUpDialog"> \
          <div class="content">{{ popUpDialogContent2 }}</div> \
          <div class="clearfix buttons-container"> \
            <div>\
           {{customer}}\
            </div>\
            <div>\
            <select  ng-model="sMenu"  \
                ng-options="men.Id as men.name for men in menu">>\
            </select >\
            </div>\
            <div class="pull-left"> \
              <button class="btn btn-primary" ng-click="Edit(order_Id, sMenu)">Да</button> \
            </div> \
            <div class="pull-right"> \
              <button class="btn btn-warning" ng-click="closePopUpDialog2()">Нет</button> \
            </div> \
          </div> \
          </div> \
        </div>',
        controller: function ($scope) {

            $scope.showPopUpDialog2 = false;

            $scope.closePopUpDialog2 = function () {
                $scope.showPopUpDialog2 = false;
            }

            $scope.popUpDialogApprove2 = function () {
                $scope[$scope.popUpDialogCallback2]();
                $scope.showPopUpDialog2 = false;
            }
        }
    }
})
