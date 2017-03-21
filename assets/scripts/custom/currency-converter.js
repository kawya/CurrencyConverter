var app = angular.module('currencyConverter', []);
app.controller('converterController', function($scope, $http) {
  //variable declaration
  $scope.currencyMode1 = 'EUR';
  $scope.currencyMode2 = 'USD';
  $scope.currencyList = ['USD', 'CAD', 'EUR'];
  $scope.currencyRate = {};
  $scope.showDisclaimer = false;
  $scope.negativeFromCurrValidation = false;//currency negative variable
  $scope.disableConvertedCurr = true;
    
  //service call for currency
  $http.get('https://api.fixer.io/latest')
    .then(function(response) {
      $scope.currencyRate = response.data.rates;
      $scope.currencyRate.EUR = 1;
      $scope.fromCurrValue = 1;
      $scope.currencyConvert();
    });

  // function definition
  $scope.currencyConvert = function() {
    if ($scope.fromCurrValue >= 0) { //negative validation
      $scope.negativeFromCurrValidation = false;
      $scope.currencyRateConversion();
    } else {
      $scope.negativeFromCurrValidation = true;
      $scope.toCurrValue= 0;
    }  
  };
    
 //currency conversion
  $scope.currencyRateConversion = function() { 
    $scope.currencyTypeTo = $scope.currencyRate[$scope.currencyMode2];
    $scope.currencyTypeFrom = $scope.currencyRate[$scope.currencyMode1];
    $scope.toCurrValue = $scope.fromCurrValue * ($scope.currencyTypeTo * (1 / $scope.currencyTypeFrom));
  }

});
