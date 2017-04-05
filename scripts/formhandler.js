var dialogueBox_popUp = false;
var $ = window.jQuery;
var coffee;

(function(window) {
    'use strict';
    var App = window.App || {};


    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var strength = $('#strengthLevel').val();
            var flavor = $('#flavorshot').find(':selected').val();
            var size = $('input[name=size]:checked').val();
            if (strength > 66 && flavor != '' && size === 'coffeezilla' && dialogueBox_popUp === false) {

                console.log('Modal is displayed now');
                dialogueBox_popUp = true;
                $('#myModal').modal('show');
            } else {
                var data = {};
                $(this).serializeArray().forEach(function(item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                console.log(data);

                fn(data);
                this.reset();
                this.elements[0].focus();
                dialogueBox_popUp = false;
                $('#sliderBar').hide();
                $('#strength-range').empty();
                $('#strength-range').append('Caffeine percentage: 30');
                $('#strength-range').css('color', 'green');
            }
        });
    };


    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            console.log(fn(emailAddress));
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });

        FormHandler.prototype.addInputValidCoffeeOrderHandler = function(fn) {
            this.$formElement.on('input', '[name="coffee"]', function(event) {
                var coffeeValue = $('#coffeeOrder').val();
                var strengthValue = $('#strengthLevel').val();
                var message = '';
                coffee = event.target;
                event.target.setCustomValidity('');
                if (!(fn(coffeeValue, strengthValue))) {
                    message = coffeeValue + ' is not a valid coffee Order and has high caffeine strength.';
                    event.target.setCustomValidity(message);
                }
            });
        };
        FormHandler.prototype.addInputValidCoffeeStrengthHandler = function(fn) {
            this.$formElement.on('input', '[name="strength"]', function(event) {
                var coffeeValue = $('#coffeeOrder').val();
                var strengthValue = $('#strengthLevel').val();
                var message = '';
                event.target.setCustomValidity('');
                coffee.setCustomValidity('');
                if (!(fn(coffeeValue, strengthValue))) {
                    message = ' High caffeine strength.';
                    event.target.setCustomValidity(message);
                }
            });
        };

    };
    App.FormHandler = FormHandler;
    window.App = App;
})(window);

$('#strengthLevel').change(function() {
    document.getElementById('[strength-range]');
    $('#strength-range').empty();
    $('#strength-range').append('Caffeine percentage: ' + this.value);
    if (this.value <= 33) {
        $('#strength-range').css('color', 'green');
    } else if (this.value > 33 && this.value <= 85) {
        $('#strength-range').css('color', 'yellow');
    } else {
        $('#strength-range').css('color', 'red');
    }
});

$('#powerUpClaim').on('click', function() {
    $('#myModal').modal('hide');
    $('#powerUpComboBox').show();
});

$('#noPowerup').on('click', function() {
    $('#myModal').modal('hide');
});
