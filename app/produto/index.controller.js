(function () {
    'use strict';

    angular
        .module('app')
        .controller('Produto.IndexController', Controller);

    function Controller($window, ProdutoService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;

        initUser();

        function initUser() {
            // get current user data in the API
            ProdutoService.GetUserId().then(function (userId) {
                ProdutoService.GetCurrent(userId).then(function (user) {
                        vm.user = user;
                    });
            });
            
        }

        function saveUser() {
            ProdutoService.Update(vm.user)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteUser() {
            ProdutoService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();