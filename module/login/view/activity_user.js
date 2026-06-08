// ================AJAX-PROMISE================
function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    // Compatibility: handle method-first calls like ajaxPromise('POST', 'JSON', 'url', data)
    if (typeof sUrl === 'string' &&
        (sUrl.toUpperCase() === 'GET' || sUrl.toUpperCase() === 'POST' ||
         sUrl.toUpperCase() === 'PUT'  || sUrl.toUpperCase() === 'DELETE')) {
        var _m = sUrl; sUrl = sTData; sTData = sType; sType = _m;
    }
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData,
            beforeSend: function() {
                $("#overlay").fadeIn(300);
            }
        }).done((data) => {
            setTimeout(function() {
                $("#overlay").fadeOut(300);
            }, 500);
            resolve(data)

        }).fail((jqXHR, textStatus, errorThrow) => {
            setTimeout(function() { $("#overlay").fadeOut(300); }, 500);
            reject(errorThrow);
        });
    });
}

//================LOAD-HEADER================
function load_menu() {
    if (window._menu_loaded) return;
    window._menu_loaded = true;
    var token = localStorage.getItem('token');
    if (token) {
        ajaxPromise('module/login/controller/controller_login.php?op=data_user', 'POST', 'JSON', { 'token': token })
            .then(function(data) {
                if (data.role == "client") {
                    console.log("Client loged");
                    $('.opc_CRUD').empty();
                    $('.opc_exceptions').empty();
                } else {
                    console.log("Admin loged");
                    $('.opc_CRUD').show();
                    $('.opc_exceptions').show();
                }
                $('.log-icon').empty();
                $('#user_info').empty();
                $('<a href="index.php?page=controller_profile&op=view"><img src="' + data.avatar + '" alt="Avatar" class="log-icon-avatar"></a>').appendTo('.log-icon');
                $('<p></p>').attr({ 'id': 'user_info' }).appendTo('#des_inf_user')
                    .html(
                        '<a id="logout" title="Logout"><span class="material-symbols-outlined">logout</span></a>' +
                        '<a href="index.php?page=controller_profile&op=view" class="header-username">' + data.username + '</a>'
                    )

            }).catch(function() {
                console.log("Error al cargar los datos del user");
            });
    } else {
        console.log("No hay token disponible");
        $('.opc_CRUD').empty();
        $('.opc_exceptions').empty();
        $('#user_info').hide();
        $('.log-icon').empty();
        $('<a href="index.php?page=controller_login&op=login-register_view"><span class="material-symbols-outlined text-primary">person</span></a>').appendTo('.log-icon');
    }
}


//================CLICK-LOGIUT================
function click_logout() {
    if (window._logout_bound) return;
    window._logout_bound = true;
    $(document).on('click', '#logout', function() {
        localStorage.removeItem('total_prod');
        toastr.success("Logout succesfully");
        setTimeout('logout(); ', 1000);
    });
}

//================LOG-OUT================
function logout() {
    ajaxPromise('module/login/controller/controller_login.php?op=logout', 'POST', 'JSON')
        .then(function(data) {
            localStorage.removeItem('token');
            window.location.href = "index.php?page=controller_home&op=view";
        }).catch(function() {
            console.log('Something has occured');
        });
}

// Remove localstorage('page') with click in shop
function click_shop() {
    if (window._shop_bound) return;
    window._shop_bound = true;
    $(document).on('click', '#opc_shop', function() {
        localStorage.removeItem('page');
        localStorage.removeItem('total_prod');
    });
}

$(document).ready(function() {
    load_menu();
    click_logout();
    click_shop();
});