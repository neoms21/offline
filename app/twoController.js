var twoController = function ($scope, databaseService) {

    $scope.model = 'assessments';
    $scope.id = 0;
    $scope.isInt = true;
    databaseService.openDatabase().then(function (result) {
        $scope.results = 'Done';
    })

    $scope.getData = function () {
        databaseService.get($scope.model, $scope.isInt ? parseInt($scope.id) : $scope.id).then(function (result) {
            $scope.results = result;
        });
    }
};
twoController.$inject = ['$scope', 'databaseService'];
app.controller('twoController', twoController);