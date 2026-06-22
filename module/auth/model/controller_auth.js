function login() {
    if (validate_login() != 0) {
        var data = $('#login__form').serialize();
        ajaxPromise('module/auth/controller/controller_auth.php?op=login', 'POST', 'JSON', data)
            .then(function(result) {
                if (result == "error_user") {
                    document.getElementById('error_username_log').innerHTML = "The user does not exist; please check that you have entered the name correctly"
                } else if (result == "error_passwd") {
                    document.getElementById('error_passwd_log').innerHTML = "The password is incorrect"
                } else {
                    localStorage.setItem("token", result);
                    toastr.success("Loged succesfully");
                    setTimeout(' window.location.href = "index.php?module=controller_home&op=list"; ', 1000);
                }
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("The request has failed: " + textStatus);
                }
            });
    }
}

function key_login() {
    $("#login").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            login();
        }
    });
}

function button_login() {
    $('#login').on('click', function(e) {
        e.preventDefault();
        login();
    });
}

function validate_login() {
    var error = false;

    if (document.getElementById('username_log').value.length === 0) {
        document.getElementById('error_username_log').innerHTML = "You need to enter your username";
        error = true;
    } else {
        if (document.getElementById('username_log').value.length < 5) {
            document.getElementById('error_username_log').innerHTML = "The username must be at least 5 characters long";
            error = true;
        } else {
            document.getElementById('error_username_log').innerHTML = "";
        }
    }

    if (document.getElementById('passwd_log').value.length === 0) {
        document.getElementById('error_passwd_log').innerHTML = "You need to enter your password";
        error = true;
    } else {
        document.getElementById('error_passwd_log').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}

$(document).ready(function() {
    key_login();
    button_login();
});