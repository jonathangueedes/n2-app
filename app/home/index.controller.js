(function() {
    'use strict';
    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService) {
        var vm = this;
        vm.user = null;
        vm.proximo = null;


        let usingSessionStorage = JSON.parse(localStorage.getItem("user"));
        console.log(usingSessionStorage)

        if (!usingSessionStorage) {
            initUser();
        } else {
            vm.user = usingSessionStorage
        }

        function initUser() {
            // get current user data in the API
            UserService.GetUserId().then(function(userId) {
                UserService.GetCurrent(userId).then(function(user) {
                    vm.user = user;
                    if (vm.user.Coordenadas) {
                        var coordenadas = vm.user.Coordenadas;
                        searchNearLocation(coordenadas);

                    }
                });

            });
        }


        function searchNearLocation(coordenadas) {
            UserService.nearLocation(coordenadas).then(function(result) {
                vm.proximo = result
                console.log(vm.proximo);











            });
        }





    }



})();