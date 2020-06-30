(function() {
    'use strict';
    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService) {
        var vm = this;
        vm.user = null;

        let usingSessionStorage = JSON.parse(localStorage.getItem("user"));
        console.log(usingSessionStorage)

        if (!usingSessionStorage) {
            initUser();
        } else {
            vm.user = usingSessionStorage
        }

        function initUser() {
            UserService.GetUserId().then(function(userId) {
                UserService.GetCurrent(userId).then(function(user) {
                    vm.user = user;

                    sessionStorage.setItem("user", JSON.stringify(user));
                });
            });
        }

        if (vm.user.cep) {
            console.log("tem cep cadastrado")
        }

        // UserService.getLocation().then(function(response) {
        //     //console.log(response.data.results[0].locations[0].latLng)
        //     var { lat: latitude, lng: longitude } = response.data.results[0].locations[0].latLng;
        //     vm.user.latitude = latitude;
        //     vm.user.longitude = longitude
        //     console.log(vm.user.latitude);
        //     console.log(vm.user.longitude);
        // });
    }
})();