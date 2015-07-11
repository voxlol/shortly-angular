angular.module('shortly.links', [])

.controller('LinksController', function ($scope, $window, Links) {
  angular.extend($scope, Links);
  // $scope.data = Links.links;
  // $scope.getLinks = function(){
  //   Links.getLinks().then(function(data){
  //     console.log(data + '----------------------------------------------------');
  //     $scope.data['links'] = data;
  //   })
  // }
  $scope.getLinks().then(function(data){
    $scope.data.links = data;
  });
  $scope.redirect = function(url){
    $window.location.href = url;
  };
});
