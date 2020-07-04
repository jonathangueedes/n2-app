(function() {
    'use strict';

    angular
        .module('app')
        .controller('Account.IndexController', Controller);

    function Controller($window, UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.createUser = createUser;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;

        initUser();

        function initUser() {
            // get current user data in the API
            UserService.GetUserId().then(function(userId) {
                UserService.GetCurrent(userId).then(function(user) {
                    vm.user = user;
                });

            });

        }

        function saveUser() {

            UserService.getLocation(vm.user.cep).then(function(response) {
                var { lat: latitude, lng: longitude } = response.data.results[0].locations[0].latLng;
                vm.user.latitude = latitude;
                vm.user.longitude = longitude;

                console.log(vm.user)

                UserService.Update(vm.user)
                    .then(function() {
                        //FlashService.Success('User updated');
                        alert("Atualização efetuada com sucesso")
                    })
                    .catch(function(error) {
                        //FlashService.Error(error);
                        alert(error)
                    });

            });
        }

        function createUser() {
            UserService.create(vm.user)
                .then(function() {
                    FlashService.Success('User Created');
                })
                .catch(function(error) {
                    FlashService.Error(error);
                });
        }

        function deleteUser() {
            UserService.Delete(vm.user._id)
                .then(function() {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function(error) {
                    FlashService.Error(error);
                });
        }
    }

})();