var testApp = angular.module('testApplication', []);

testApp.controller('testController', function ($scope, $http) {
    $scope.sortBy = undefined;
    $scope.destination = false;
    $scope.pageSize = 3;
    $scope.pageNum = 1;
    $scope.pageCount = 1;
    $scope.totalCount = 1;

    $scope.serverURL = "http://localhost:64540/";


    $scope.getData = function () {
        var url = "clients";
        var urlParams = {};

        if ($scope.f_surname)
            urlParams["surname"] = $scope.f_surname;
        if ($scope.f_name)
            urlParams["name"] = $scope.f_name;
        if ($scope.f_birthdayFrom)
            urlParams["birthdayFrom"] = $scope.f_birthdayFrom;
        if ($scope.f_birthdayTo)
            urlParams["birthdayTo"] = $scope.f_birthdayTo;
        if ($scope.f_sex)
            urlParams["sex"] = $scope.f_sex;

        urlParams["page"] = $scope.pageNum;
        urlParams["pageSize"] = $scope.pageSize;


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

                $scope.clients = data.Data;
                $scope.totalCount = data.TotalCount;
                $scope.pageCount = Math.floor(data.TotalCount / $scope.pageSize) + ((data.TotalCount % $scope.pageSize) ? 1 : 0);

            }
        ).error(function () { });


    };


    $scope.sort = function (name) {
        if ($scope.sortBy == name) {
            $scope.destination = !$scope.destination;
        } else {
            $scope.destination = false;
            $scope.sortBy = name;
        }

    };
    $scope.isSortedDesc = function (name) {
        return $scope.sortBy == name && $scope.destination;
    };
    $scope.isSortedAsc = function (name) {
        return $scope.sortBy == name && !$scope.destination;
    };

    $scope.getData();

    $scope.onFirst = function () {
        $scope.pageNum = 1;
        $scope.getData();
    };
    $scope.onNext = function () {
        if ($scope.pageNum < $scope.pageCount) {
            $scope.pageNum += 1;
        }
        $scope.getData();
    };
    $scope.onPrev = function () {
        if ($scope.pageNum > 1) {
            $scope.pageNum -= 1;
        }
        $scope.getData();
    };
    $scope.onLast = function () {
        $scope.pageNum = $scope.pageCount;
        $scope.getData();
    };
    $scope.takeDate = function (dd) {
        return dd.substring(0, dd.indexOf(" "));
    };
    $scope.sex = function (id) {
        switch (id) {
            case 1:
                return "Male";
            case 2:
                return "Female";
        }
        return "N/A";
    };



});

testApp.directive('theCalendar', function () {
    return {
        restrict: "E",
        require: "ngModel",
        replace: true,
        templateUrl: "calendar.htm",
        scope: {
            value: '=',
        },
        link: function (scope, element, attrs, ngModel) {
            scope.value = _removeTime(scope.value || moment());
            scope.month = scope.value.clone();
            scope.isVisible = false;
            scope.inputText = "01.01.1990";

            var start = scope.value.clone();
            start.date(1);
            _removeTime(start.day(0));

            _buildMonth(scope, start, scope.month);

            scope.inputKeyPress = function (event) {
                if (event.which === 13) {
                    scope.isVisible = !scope.isVisible;
                };
            };

            scope.inputChanged = function () {
                var newDate = moment(scope.inputText, "DD.MM.YYYY");
                if (!newDate.isValid())
                    return;
                scope.value = newDate;

                scope.month = scope.value.clone();
                var start = scope.value.clone();
                start.date(1);
                _removeTime(start.day(0));

                _buildMonth(scope, start, scope.month);
            };

            scope.select = function (day) {
                scope.value = day.date;
                scope.inputText = day.date.format("DD.MM.YYYY");

                scope.month = scope.value.clone();
                var start = scope.value.clone();
                start.date(1);
                _removeTime(start.day(0));
                _buildMonth(scope, start, scope.month);
            };

            scope.next = function () {
                var next = scope.month.clone();
                _removeTime(next.month(next.month() + 1).date(1));
                scope.month.month(scope.month.month() + 1);
                _buildMonth(scope, next, scope.month);
            };

            scope.previous = function () {
                var previous = scope.month.clone();
                _removeTime(previous.month(previous.month() - 1).date(1));
                scope.month.month(scope.month.month() - 1);
                _buildMonth(scope, previous, scope.month);
            };

        }
    };
});



function _removeTime(date) {
    return date.day(0).hour(0).minute(0).second(0).millisecond(0);
}

function _buildMonth(scope, start, month) {
    scope.weeks = [];
    var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
    while (!done) {
        scope.weeks.push({ days: _buildWeek(date.clone(), month, scope.value) });
        date.add(1, "w");
        done = count++ > 2 && monthIndex !== date.month();
        monthIndex = date.month();
    }
}

function _buildWeek(date, month, selectedDate) {
    var days = [];
    for (var i = 0; i < 7; i++) {
        days.push({
            name: date.format("dd").substring(0, 1),
            number: date.date(),
            isCurrentMonth: date.month() === month.month(),
            isToday: date.isSame(selectedDate, "day"),
            date: date
        });
        date = date.clone();
        date.add(1, "d");
    }
    return days;
}



