(function () {
    'use strict';
    angular
        .module('app')
        .controller('Home.IndexController', Controller);
    function Controller(UserService) {
        var vm = this;
        vm.user = null;
            
        let usingSessionStorage = JSON.parse(localStorage.getItem("user"));
        console.log(usingSessionStorage)
             
        if (!usingSessionStorage){
            initUser();
        }
        else{
            vm.user = usingSessionStorage
        }
            
        function initUser() {
            UserService.GetUserId().then(function (userId) {
                UserService.GetCurrent(userId).then(function (user) {
                        vm.user = user;
                        
                        sessionStorage.setItem("user", JSON.stringify(user));
                    });
            });
        }
    }
})();