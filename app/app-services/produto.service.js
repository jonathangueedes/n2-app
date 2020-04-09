(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProdutoService', Service);

    function Service($http, $q) {
        var apiURL = "http://localhost:9050/api/estoque";
        var service = {};

        service.GetToken = GetToken;
        service.GetProdutoId = GetProdutoId;
        service.GetCurrent = GetCurrent;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        
        return service;

        function GetProdutoId() {
            // get userId token from server
            return $.get('/app/estoque/userId');
        }

        function GetToken() {
            // get userId token from server
            return $.get('/app/token');
        }

        function GetCurrent(userId) {
            return $http.get(apiURL + '/' + userId).then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get(apiURL+ '/getAll').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.getapiURL + (apiURL + '/' + _id).then(handleSuccess, handleError);
        }

        function GetByUsername(username) {
            return $http.get(apiURL + '/' + username).then(handleSuccess, handleError);
        }

        function Create(produto) {
            return $http.post(apiURL + '/register', produto).then(handleSuccess, handleError);
        }

        function Update(produto) {
            return $http.put(apiURL + '/' + produto._id, produto).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete(apiURL + '/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
        
    }

})();
