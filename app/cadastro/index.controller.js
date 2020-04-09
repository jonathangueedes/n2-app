(function () {
    'use strict';

    angular
        .module('app')
        .controller('Cadastro.IndexController', Controller);

    function Controller($window, ProdutoService, FlashService) {
        var vm = this;

        vm.produto = null;
        vm.saveProduto = saveProduto;
        vm.updateProduto = updateProduto;
        vm.deleteProduto = deleteProduto;

        initProduto();

        function initProduto() {
            // get current user data in the API
            vm.produto = null;

        }

        function saveProduto() {
            ProdutoService.Create(vm.produto)
                .then(function () {
                    FlashService.Success('Produto cadastrado com sucesso');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function updateProduto() {
            ProdutoService.Update(vm.produto)
                .then(function () {
                    FlashService.Success('Produto atualizado');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteProduto() {
            ProdutoService.Delete(vm.produto._id)
                .then(function () {
                    // log user out
                    FlashService.Success('Produto deletado');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }


    }

})();