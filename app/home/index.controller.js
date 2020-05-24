(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);



    

        function Controller(UserService) {
        var vm = this;
        vm.user = null;

        
        let usingLocalStorage = JSON.parse(localStorage.getItem("user"));
        console.log(usingLocalStorage)

        if (!usingLocalStorage){
            initUser();
        }
        else{
        vm.user = usingLocalStorage
        console.log("passei por aqui e estou usando local storage !!!")
        }




        // if usingLocalStorage === false{
        //     initUser();
        // }
        

        function initUser() {
            // get current user data in the API
            UserService.GetUserId().then(function (userId) {
                UserService.GetCurrent(userId).then(function (user) {
                        vm.user = user;

                        localStorage.setItem("user", JSON.stringify(user));


                    });
            });


        }

    }

    
   

})();