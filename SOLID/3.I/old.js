"use strict";
var FACEBOOK_TOKEN = "secret_token_facebook";
var GOOGLE_TOKEN = "secret_token_google";
//interface GoogleAuth {
//     setGoogleToken(token : string);
//     checkGoogleLogin(token : string) : boolean;
// }
//
// interface FacebookAuth {
//     setFacebookToken(token : string);
//     getFacebookLogin(token : string) : boolean;
// }
var User = /** @class */ (function () {
    function User() {
        this._password = 'user';
    }
    //Interesting detail here: while I did not define a return type or param type, any deviation from the interface will give you an error.
    // Test it out by uncommenting the code below.
    User.prototype.checkLogin = function (token) {
        //return "this will not work";
        return (token === this._token);
    };
    User.prototype.setToken = function (token) {
        this._token = token;
    };
    //getFacebookLogin(token) {
    //         return (token === this._facebookToken);
    //     }
    //
    //     setFacebookToken(token : string) {
    //         this._facebookToken = token;
    //     }
    User.prototype.checkPassword = function (password) {
        return (password === this._password);
    };
    User.prototype.resetPassword = function () {
        this._password = prompt('What is your new password?');
    };
    return User;
}());
//admin cannot use google or facebook token
var Admin = /** @class */ (function () {
    function Admin() {
        this._password = 'admin';
    }
    Admin.prototype.checkPassword = function (password) {
        return (password === this._password);
    };
    Admin.prototype.resetPassword = function () {
        this._password = prompt('What is your new password?');
    };
    return Admin;
}());
var GoogleBot = /** @class */ (function () {
    function GoogleBot() {
        this._token = GOOGLE_TOKEN;
    }
    GoogleBot.prototype.checkLogin = function (token) {
        // return "this will not work";
        return (token === this._token);
    };
    GoogleBot.prototype.setToken = function (token) {
        this._token = token;
    };
    return GoogleBot;
}());
var passwordElement = document.querySelector('#password');
var typePasswordElement = document.querySelector('#typePassword');
var typeGoogleElement = document.querySelector('#typeGoogle');
var typeFacebookElement = document.querySelector('#typeFacebook');
var loginAsAdminElement = document.querySelector('#loginAsAdmin');
var resetPasswordElement = document.querySelector('#resetPassword');
var guest = new User;
var admin = new Admin;
var googleBot = new GoogleBot;
document.querySelector('#login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var user = loginAsAdminElement.checked ? admin : guest;
    if (!loginAsAdminElement.checked) {
        if (typeGoogleElement.checked) {
            user.setToken(GOOGLE_TOKEN);
        }
        if (typeFacebookElement.checked) {
            user.setToken(FACEBOOK_TOKEN);
        }
    }
    debugger;
    var auth = false;
    switch (true) {
        case typePasswordElement.checked:
            auth = user.checkPassword(passwordElement.value);
            break;
        case typeGoogleElement.checked:
            auth = user.checkLogin(GOOGLE_TOKEN);
            break;
        case typeFacebookElement.checked:
            debugger;
            auth = user.checkLogin(FACEBOOK_TOKEN);
            break;
    }
    if (auth) {
        alert('login success');
    }
    else {
        alert('login failed');
    }
});
resetPasswordElement.addEventListener('click', function (event) {
    event.preventDefault();
    var user = loginAsAdminElement.checked ? admin : guest;
    user.resetPassword();
});
