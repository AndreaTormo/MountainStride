<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/CRUD/Mountain_stride_MVC_v11 - copia_filtros/';
include($path . "module/auth/model/DAO_auth.php");

@session_start();

switch ($_GET['op'] ?? '') {

    case 'login-register_view':
        include("module/auth/view/login_register.html");
        break;

    case 'login':
        $daoauth = new DAOAuth();
        $username = $_POST['username_log'] ?? '';
        $passwd   = $_POST['passwd_log'] ?? '';

        $user = $daoauth->select_user($username);
        if ($user === "error_user") {
            echo json_encode("error_user");
        } elseif (!password_verify($passwd, $user['password'])) {
            echo json_encode("error_passwd");
        } else {
            $token = base64_encode($user['username'] . '.' . time());
            $_SESSION['username'] = $user['username'];
            $_SESSION['token']    = $token;
            echo json_encode($token);
        }
        break;

    case 'register':
        $daoauth = new DAOAuth();
        $username = $_POST['username_reg'] ?? '';
        $email    = $_POST['email_reg'] ?? '';
        $passwd   = $_POST['passwd1_reg'] ?? '';

        if ($daoauth->select_email($email)) {
            echo json_encode("error_email");
            break;
        }
        if ($daoauth->select_user($username) !== "error_user") {
            echo json_encode("error_user");
            break;
        }
        if ($daoauth->insert_user($username, $email, $passwd)) {
            echo json_encode("ok");
        } else {
            echo json_encode("error");
        }
        break;

    case 'controluser':
        $token = $_POST['token'] ?? '';
        if ($token === ($_SESSION['token'] ?? '')) {
            echo json_encode("Correct_User");
        } else {
            echo json_encode("Wrong_User");
        }
        break;

    case 'data_user':
        $token = $_POST['token'] ?? '';
        if ($token === ($_SESSION['token'] ?? '')) {
            $daoauth = new DAOAuth();
            $user = $daoauth->select_user($_SESSION['username'] ?? '');
            if ($user !== "error_user") {
                echo json_encode([
                    'username' => $user['username'],
                    'avatar' => $user['avatar'] ?? 'default-avatar.png',
                    'role' => $user['role'] ?? 'client'
                ]);
            }
        }
        break;

    case 'actividad':
        if (isset($_SESSION['username'])) {
            echo json_encode("activo");
        } else {
            echo json_encode("inactivo");
        }
        break;

    case 'refresh_token':
        $token = $_POST['token'] ?? '';
        if ($token === ($_SESSION['token'] ?? '')) {
            $new_token = base64_encode($_SESSION['username'] . '.' . time());
            $_SESSION['token'] = $new_token;
            echo json_encode($new_token);
        }
        break;

    case 'refresh_cookie':
        if (isset($_SESSION['username'])) {
            $_SESSION['last_activity'] = time();
            echo json_encode("ok");
        }
        break;

    case 'logout':
        session_destroy();
        echo json_encode("ok");
        break;

    default:
        include("view/inc/error404.php");
        break;

    case 'profile';
        include("module/profile/view/profile.html");
        break;
        
}
?>
