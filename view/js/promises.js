// ================AJAX-PROMISE================
function ajaxPromise(sType, sTData, sUrl, sData = undefined) {
    if (typeof sType === 'string' && (sType.indexOf('.php') !== -1 || sType.indexOf('module/') === 0)) {
        var url = sType;
        sType = sTData;
        sTData = sUrl;
        sUrl = url;
    }

    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        });
    });
}

// ================LOAD-HEADER================
function load_menu() {
    if (window._menu_loaded) return;
    window._menu_loaded = true;
    var token = localStorage.getItem('token');
    if (token) {
        ajaxPromise('module/auth/controller/controller_auth.php?op=data_user', 'POST', 'JSON', { 'token': token })
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
                    );
            }).catch(function() {
                console.log("Error al cargar los datos del user");
            });
    } else {
        console.log("No hay token disponible");
        $('.opc_CRUD').empty();
        $('.opc_exceptions').empty();
        $('#user_info').hide();
        $('.log-icon').empty();
        $('<a href="index.php?page=controller_auth&op=login-register_view"><span class="material-symbols-outlined text-primary">person</span></a>').appendTo('.log-icon');
    }
}

// ================CLICK-LOGOUT================
function click_logout() {
    if (window._logout_bound) return;
    window._logout_bound = true;
    $(document).on('click', '#logout', function() {
        localStorage.removeItem('total_prod');
        toastr.success("Logout succesfully");
        setTimeout('logout(); ', 1000);
    });
}

// ================LOG-OUT================
function logout() {
    ajaxPromise('module/auth/controller/controller_auth.php?op=logout', 'POST', 'JSON')
        .then(function(data) {
            localStorage.removeItem('token');
            window.location.href = "index.php?page=controller_home&op=view";
        }).catch(function() {
            console.log('Something has occured');
        });
}

// ================CLICK-SHOP================
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
