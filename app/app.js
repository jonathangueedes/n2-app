﻿(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    
        var date = new Date();
        // get the date as a string
        var n = date.toLocaleString('pt-BR');
        // get the time as a string
        document.getElementById('time').innerHTML = 'Data ' + n;

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
            .state('produto', {
                url: '/produto',
                templateUrl: 'produto/index.html',
                controller: 'Produto.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'produto' }
            })
            .state('cadastro', {
                url: '/cadastro',
                templateUrl: 'cadastro/index.html',
                controller: 'Cadastro.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'cadastro' }
            });
    }

    function run($http, $rootScope, $window) {
        // get JWT token from server
        $.get('/app/token', function (token) {
            // add JWT token as default auth header
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            // update active tab on state change
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.activeTab = toState.data.activeTab;
            });
        });
    }

    $(function () {
        angular.bootstrap(document, ['app']);
    });
})();