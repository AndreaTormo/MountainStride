function register() {
    if (validate_register() != 0) {
        var data = $('#register__form').serialize();

        ajaxPromise('module/auth/controller/controller_auth.php?op=register', 'POST', 'JSON', data)
            .then(function(result) {
                if (result == "error_email") {
                    document.getElementById('error_email_reg').innerHTML = "This email address is already in use; please make sure you don't already have an account"
                } else if (result == "error_user") {
                    document.getElementById('error_username_reg').innerHTML = "That username is already taken; please try another one."
                } else {
                    toastr.success("Register succesfully");
                    setTimeout(' window.location.href = "index.php?module=controller_auth&op=login-register_view"; ', 1000);
                }
            }).catch(function(textStatus) {
                if (console && console.log) {
                    console.log("The request has failed: " + textStatus);
                }
            });
    }
}

function key_register() {
    $("#register").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            register();
        }
    });
}

function button_register() {
    $('#register').on('click', function(e) {
        e.preventDefault();
        register();
    });
}

function validate_register() {
    var username_exp = /^(?=.{5,}$)(?=.*[a-zA-Z0-9]).*$/;
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var pssswd_exp = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    var error = false;

    if (document.getElementById('username_reg').value.length === 0) {
        document.getElementById('error_username_reg').innerHTML = "You need to enter your username";
        error = true;
    } else {
        if (document.getElementById('username_reg').value.length < 5) {
            document.getElementById('error_username_reg').innerHTML = "The username must be at least 5 characters long";
            error = true;
        } else {
            if (!username_exp.test(document.getElementById('username_reg').value)) {
                document.getElementById('error_username_reg').innerHTML = "You need to enter your password";
                error = true;
            } else {
                document.getElementById('error_username_reg').innerHTML = "";
            }
        }
    }

    if (document.getElementById('email_reg').value.length === 0) {
        document.getElementById('error_email_reg').innerHTML = "You need to send an email";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('email_reg').value)) {
            document.getElementById('error_email_reg').innerHTML = "The email format is invalid";
            error = true;
        } else {
            document.getElementById('error_email_reg').innerHTML = "";
        }
    }

    if (document.getElementById('passwd1_reg').value.length === 0) {
        document.getElementById('error_passwd1_reg').innerHTML = "You need to enter your password";
        error = true;
    } else {
        if (document.getElementById('passwd1_reg').value.length < 8) {
            document.getElementById('error_passwd1_reg').innerHTML = "The password must be at least 8 characters long";
            error = true;
        } else {
            if (!pssswd_exp.test(document.getElementById('passwd1_reg').value)) {
                document.getElementById('error_passwd1_reg').innerHTML = "It must contain at least 8 characters, including upper-case letters, lower-case letters and special characters";
                error = true;
            } else {
                document.getElementById('error_passwd1_reg').innerHTML = "";
            }
        }
    }

    if (document.getElementById('passwd2_reg').value.length === 0) {
        document.getElementById('error_passwd2_reg').innerHTML = "You need to re-enter your password";
        error = true;
    } else {
        if (document.getElementById('passwd2_reg').value.length < 8) {
            document.getElementById('error_passwd2_reg').innerHTML = "The password must be at least 8 characters long";
            error = true;
        } else {
            if (document.getElementById('passwd2_reg').value === document.getElementById('passwd1_reg').value) {
                document.getElementById('error_passwd2_reg').innerHTML = "";
            } else {
                document.getElementById('error_passwd2_reg').innerHTML = "The passwords do not match";
                error = true;
            }
        }
    }

    if (error == true) {
        return 0;
    }
}

$(document).ready(function() {
    key_register();
    button_register();
});