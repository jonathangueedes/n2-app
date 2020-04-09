(function () {
    'use strict';

    angular
        .module('app')
        .controller('Produto.IndexController', Controller);

    function Controller($window, ProdutoService, FlashService) {
        var vm = this;

        vm.deleteProduto = deleteProduto;
        vm.listarProduto = GetAll;
        vm.updateProduto = updateProduto;
        vm.produto = null;
        vm.produtoSelecionado = {};

        vm.setProdutoSelecionado = setProduto;


        GetAll();


        function setProduto(produto) {
            vm.produtoSelecionado = produto;
            $window.scrollTo(0, 435);

        }
 
        function GetAll() {
            ProdutoService.GetAll()
                .then(function (list_) {
                    vm.listarProduto = list_;
                })
                .catch(function (error) {
                    console.log(error);
                    FlashService.Error(error);
                });
        }

        function deleteProduto(_id) {
            ProdutoService.Delete(_id)
                .then(function () {
                    // log user out
                    FlashService.Success('Excluido com Sucesso')
                    setTimeout(() => window.location.reload(), 2000);
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function updateProduto() {
            ProdutoService.Update(vm.produtoSelecionado)
                .then(function () {
                    // log user out
                    FlashService.Success('Alterado com Sucesso')
                    setTimeout(() => window.location.reload(), 2000);
                    $window.scrollTo(0, 0);


                    
                    
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();