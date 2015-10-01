var app = angular.module('racingFrogs', []);
app.controller('MainController', MainController);
//No need to change anything above this line.
var namesList = [
    'Jo', 'Pinkie', 'Ezekiel', 'Cherri', 'Jacinto', 'Taisha', 'Vivien', 'Bradford', 'Floretta', 'Jennell', 'Josette', 'Alma', 'Zandra', 'Juliette', 'Jeri', 'Chery', 'Justina', 'Lelia', 'Melani', 'Zula'
]
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

    function Frog(name, posX, bet) {
        this.name = name;
        this.posX = posX;
        this.bet = bet;
    }
    vm.frogs = [];
    vm.addFrog = function (name) {
        name = $('.frogAdderInput')
        if (name.val() === '') {
            var newFrog = new Frog(namesList[Math.floor((Math.random() * namesList.length) + 1)], 144, 0);
            vm.frogs.push(newFrog);
            name.val('');
        }
        else {
            var newFrog = new Frog(name.val(), 144, 0);
            vm.frogs.push(newFrog);
            name.val('');
        }
    }
    vm.startRace = function () {
        var frogsArr = [];
        if (vm.frogs.length < 2) {
            alert('a race has to have at least 2 contestants before it can start or accept bets');
        } else {
            vm.frogs.forEach(function (frog) {
                while(frog.posX < 700){
                frog.posX += Math.floor((Math.random() * 100) + 1);
                if (frog.posX > 144) {
                    $('.frogAdderInput, frogAdderButton').attr('disabled', true);
                }
                if (frog.posX >= 700) {
                    frogsArr.push(frog);
                    break;
                }
               }
            })
            if (frogsArr.length > 1) {
                alert('Looks like it\'s a tie between ' + frogsArr[0].name + " and " + frogsArr[1].name + '!');
                vm.frogs.forEach(function(frog){
                frog.posX = 144;
                });
                return;
            } else {
                alert(frogsArr[0].name + ' has won!');
                if (frogsArr[0].bet > 0) {
                    vm.cashOnHand.amount += parseInt(frogsArr[0].bet);
                }
            }
            vm.frogs.forEach(function(frog){
                frog.posX = 144;
            })
        }
    }
    vm.newRace = function () {
        vm.frogs = [];
        $('.frogAdderInput').val('');
        $('.frogAdderInput').attr('disabled', false);
    }
    vm.cashOnHand = {
        amount: 10
    }
    vm.bet = function (index) {
        vm.frogs[index].bet = vm.subtract;
        if (vm.frogs[index].bet < 1) {
            $('<p></p>').text('Nice try, buddy.').addClass('timeout').appendTo('.panel-title');
            setTimeout(function () {
                $('.timeout').fadeOut('slow');
            }, 3000)
        } else {
            $('<p></p>').text('You bet $' + vm.frogs[index].bet + ' on ' + vm.frogs[index].name).addClass('timeout').appendTo('.panel-title');
            setTimeout(function () {
                $('.timeout').fadeOut('slow');
            }, 3000)
            vm.cashOnHand.amount -= vm.subtract;
            vm.subtract = '';
        }
    }
}







/*
app.service('BettingService', BettingService);

function BettingService(){
    var _races = {};
    var _raceId = 0;
    this.registerRace = function(){
        var newRace = new Race();
        return newRace.id;
    }
    this.getRace = function(raceId) {
        return Race.raceId;
    }
    var Race = function(){
        this.id = _raceId;
        this.tickets = 1300;
        this.contestants = [];
        this.open = true;
        this.bets = {};
        _races[this.id] = this;
        _raceId++;
    }
} */