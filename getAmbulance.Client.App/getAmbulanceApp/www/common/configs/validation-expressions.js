
angular.module('starter')
.config(['$validationProvider', function ($validationProvider) {

    $validationProvider.showSuccessMessage = false; // or true(default)
    // $validationProvider.showErrorMessage = false; // or true(default)





    $validationProvider
        .setExpression({
            charsonly: function (value, scope, element, param) {
                return /^([^\s\x21\x22\x24-\x26\x2a\x2b\x2f\x3a-\x40\x5c\x5e]{2,})+([\s]{0,})+(([^\s\x21\x22\x24-\x26\x2a\x2b\x2f\x3a-\x40\x5c\x5e]{2,})+([\s]{0,})){0,}$/.test(value)
            }
        })
        .setDefaultMsg({
            charsonly: {
                error: 'Name is not valid',
                success: 'Thanks!'
            }
        });

    $validationProvider
            .setExpression({
                minvalue: function (value, scope, element, attrs, param) {
                    return value.length >= ~~param;
                }
            })
            .setDefaultMsg({
                minvalue: {
                    error: 'Need to be bigger',
                    success: 'Thanks!'
                }
            });

    $validationProvider
            .setExpression({
                minvalue2: function (value, scope, element, attrs, param) {
                    return ~~value >= ~~param;
                }
            })
            .setDefaultMsg({
                minvalue2: {
                    error: 'Need to be bigger',
                    success: 'Thanks!'
                }
            })

    var lengthErrorMsg = 'הערך לא תקין';
    $validationProvider
      .setExpression({
          minlength: function (value, scope, element, attrs, param) {
              return value.toString().length >= parseInt(param);
                }
            })
      .setDefaultMsg({
            minlength: {
                error: lengthErrorMsg
            }
      });
  
    $validationProvider
    .setExpression({
        maxlength: function (value, scope, element, attrs, param) {
            return value.toString().length <= parseInt(param);
        }
    })
      .setDefaultMsg({
          maxlength: {
              error: lengthErrorMsg
          }
      });

    $validationProvider
       .setExpression({
           maxvalue2: function (value, scope, element, attrs, param) {
               return ~~value <= ~~param;
           }
       }).setDefaultMsg({
           maxvalue2: {
               error: 'Need to be smaller',
               success: 'Thanks!'
           }
       });


    $validationProvider
       .setExpression({
           customregex: function (value, scope, element, attrs, param) {
               var pattern = new RegExp(attrs.customregex || /^[0-9]{7,25}$/);
               return pattern.test(value);
           }
       }).setDefaultMsg({
           customregex: {
               error: 'Phone Number is not valid',
               success: 'Thanks!'
           }
       });




    $validationProvider
        .setExpression({
            checkConfirmPassword: function (value, scope, element, attrs, param) {
                return value == scope.$parent.dataobject.Password;
            }
        }).setDefaultMsg({
            checkConfirmPassword: {

            }
        });




    $validationProvider.setExpression({
        checkpassword: function (value, scope, element, attrs, param) {
            if (value != undefined && value != '') {
                var regExp = /^(?=.*[a-zA-Z])(?=.*\d)[^\W_]{6,15}$/;
                var res = regExp.test(value);
                console.log(res)
                return res;
            } else { return true }

        }
    }).setDefaultMsg({
        checkpassword: {
        }
    });




}]);

