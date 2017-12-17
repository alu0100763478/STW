var aplicacion = angular.module('aplicacion', []);
aplicacion.controller('Libros', function($scope, $http) {
   $scope._id = null;
   $scope.name = '';
   $scope.categoria = ''
   $scope.descripcion = '';
   $scope.url = '';
   $scope.libros = [];
   
   $scope.cargarLibros = function(){
      $http({
         method: 'GET', url: '/librosDisponibles'
      }).
      success(function(data) {
         if(typeof(data) == 'object'){
            $scope.libros = data;
            console.log(data)
         }else{
            alert('Error al intentar recuperar los libros.');
         }
      }).
      error(function() {
         alert('Error al intentar recuperar los clientes.');
      });
   };
}); 