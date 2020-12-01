const FACEBOOK_TOKEN = "secret_token_facebook";
const GOOGLE_TOKEN = "secret_token_google";
type socialMediaType = typeof FACEBOOK_TOKEN | typeof GOOGLE_TOKEN ;


interface BasicAuth {
    checkPassword(password: string): boolean;

    resetPassword();
}

interface SocialMediaAuth {
    setToken(token: string);

    checkLogin(token: string): boolean;
}

//interface GoogleAuth {
//     setGoogleToken(token : string);
//     checkGoogleLogin(token : string) : boolean;
// }
//
// interface FacebookAuth {
//     setFacebookToken(token : string);
//     getFacebookLogin(token : string) : boolean;
// }


class User implements BasicAuth, SocialMediaAuth {
    private _password: string = 'user';
    private _token: socialMediaType;


    //Interesting detail here: while I did not define a return type or param type, any deviation from the interface will give you an error.
    // Test it out by uncommenting the code below.
    checkLogin(token) {
        //return "this will not work";
        return (token === this._token);
    }

    setToken(token: socialMediaType) {
        this._token = token;
    }

//getFacebookLogin(token) {
//         return (token === this._facebookToken);
//     }
//
//     setFacebookToken(token : string) {
//         this._facebookToken = token;
//     }


    checkPassword(password: string): boolean {
        return (password === this._password);
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }
}

//admin cannot use google or facebook token
class Admin implements BasicAuth {
    private _password: string = 'admin';

    checkPassword(password: string): boolean {
        return (password === this._password);
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }
}

class GoogleBot implements SocialMediaAuth {
    private _token: socialMediaType;

    constructor() {
        this._token = GOOGLE_TOKEN;
    }

    checkLogin(token) {
        // return "this will not work";
        return (token === this._token);
    }

    setToken(token: socialMediaType) {
        this._token = token;
    }

}

const passwordElement = <HTMLInputElement>document.querySelector('#password');
const typePasswordElement = <HTMLInputElement>document.querySelector('#typePassword');
const typeGoogleElement = <HTMLInputElement>document.querySelector('#typeGoogle');
const typeFacebookElement = <HTMLInputElement>document.querySelector('#typeFacebook');
const loginAsAdminElement = <HTMLInputElement>document.querySelector('#loginAsAdmin');
const resetPasswordElement = <HTMLAnchorElement>document.querySelector('#resetPassword');

let guest = new User;
let admin = new Admin;
let googleBot = new GoogleBot;

document.querySelector('#login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let user = loginAsAdminElement.checked ? admin : guest;

    if (!loginAsAdminElement.checked) {
        if (typeGoogleElement.checked) {
            user.setToken(GOOGLE_TOKEN);
        }
        if (typeFacebookElement.checked) {
            user.setToken(FACEBOOK_TOKEN);
        }
    }
    debugger;

    let auth = false;
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
    } else {
        alert('login failed');
    }
});

resetPasswordElement.addEventListener('click', (event) => {
    event.preventDefault();

    let user = loginAsAdminElement.checked ? admin : guest;
    user.resetPassword();
});