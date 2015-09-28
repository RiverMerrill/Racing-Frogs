var app = angular.module('racingFrogs', []);
app.controller('MainController', MainController);
//No need to change anything above this line.

function MainController() {
    var vm = this; //instead of using this when refering to the controller, let's use vm. It will make things easier.
    vm.joe = new Guy('Joe', 100);
    vm.bob = new Guy('Bob', 100);
    vm.bank = 200;
    function Guy(name, startingCash) {
        this.name = name;
        this.cash = startingCash;
        this.giveCash = function (amount) {
            if (amount <= this.cash) {
                this.cash -= amount;
                return amount;
            } else {
                alert(this.name + ' does not have $' + amount)
                return 0;
            }
        }
        this.receiveCash = function (amount) {
            if (amount > 0) {
                this.cash += amount;
                return amount;
            } else {
                alert('Nice Try!')
            }
        }
    }
    vm.giveMoneyToJoe = function () {
        if (vm.bank >= 10) {
            vm.bank -= vm.joe.receiveCash(10);
        } else {
            alert('No more money in the bank!')
        }
    }
    vm.receiveMoneyFromBob = function () {
        vm.bank += vm.bob.giveCash(5);
    }
    vm.giveMoneyToBob = function () {
        if (vm.bank >= 10) {
            vm.bank -= vm.bob.receiveCash(10);
        } else {
            alert('No more money in the bank!')
        }
    }
    vm.receiveMoneyFromJoe = function () {
        vm.bank += vm.joe.giveCash(5);
    }
}