function load_profile_data() {
    var token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.php?page=controller_login&op=login-register_view';
        return;
    }

    ajaxPromise('module/profile/controller/controller_profile.php?op=get_user_data', 'POST', 'JSON', { token: token })
        .then(function(data) {
            if (data === 'error_token' || data === 'error_user' || data === 'error') {
                window.location.href = 'index.php?page=controller_login&op=login-register_view';
                return;
            }
            $('#profile_display_name').text(data.username);
            $('#profile_username').val(data.username);
            $('#profile_email').text(data.email);
            $('#profile_role').text(data.role);
            if (data.avatar) {
                $('#profile_avatar').attr('src', data.avatar);
            }
        })
        .catch(function() {
            toastr.error('Error loading profile data');
        });
}

function save_profile() {
    $('#error_profile_username').text('');
    $('#error_profile_password').text('');

    var token = localStorage.getItem('token');
    var data = {
        token:    token,
        username: $('#profile_username').val(),
        password: $('#profile_password').val()
    };

    ajaxPromise('module/profile/controller/controller_profile.php?op=update_account', 'POST', 'JSON', data)
        .then(function(result) {
            if (result === 'success') {
                toastr.success('Profile updated successfully!');
                $('#profile_password').val('');
                load_profile_data();
            } else if (result === 'no_changes') {
                toastr.info('No changes detected');
            } else if (result === 'error_username_corto') {
                $('#error_profile_username').text('Username must be at least 5 characters');
            } else if (result === 'error_password_corta') {
                $('#error_profile_password').text('Password must be at least 8 characters');
            } else if (result === 'error_invalid_data') {
                toastr.error('Invalid data — username min. 5 chars, password min. 8 chars');
            } else if (result === 'error_token') {
                window.location.href = 'index.php?page=controller_login&op=login-register_view';
            } else {
                toastr.error('Error updating profile');
            }
        })
        .catch(function() {
            toastr.error('Connection error');
        });
}

$(document).ready(function() {
    load_profile_data();

    $('#profile__form').on('submit', function(e) {
        e.preventDefault();
        save_profile();
    });
});
