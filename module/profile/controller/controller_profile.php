<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/CRUD/Mountain_stride_MVC_v11 - copia_filtros/';
include($path . "module/profile/model/DAO_profile.php");

@session_start();
$_SESSION['tiempo'] = time();

$op = $_GET['op'] ?? 'view';

switch ($op) {
    case 'view':
        include("module/profile/view/profile.html");
        break;

    case 'get_user_data':
        ob_clean();
        header('Content-Type: application/json');

        try {

            $token_dec = decode_token($_POST['token']);

            if (!$token_dec || !isset($token_dec['username'])) {
                echo json_encode("error_token");
                exit;
            }

            $daoProfile = new DAOProfile();
            $rdo = $daoProfile->select_data_user($token_dec['username']);

            if ($rdo == "error_user") {
                echo json_encode("error_user");
                exit;
            } else {
               
                unset($rdo['password']);
                echo json_encode($rdo);
                exit;
            }
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }
        break;

    case 'update_account':
        ob_clean();
        header('Content-Type: application/json');

        try {

            $token_dec = decode_token($_POST['token']);
            if (!$token_dec || !isset($token_dec['username'])) {
                echo json_encode("error_token");
                exit;
            }

            $daoProfile = new DAOProfile();

            $current_db_user = $daoProfile->select_data_user($token_dec['username']);
            if ($current_db_user == "error_user") {
                echo json_encode("error_user");
                exit;
            }

            $id_usuario = $current_db_user['id_user'];
            $db_username = $current_db_user['username'];

        
            $input_username = $_POST['username'] ?? '';
            $input_password = $_POST['password'] ?? '';


            $cambia_username = ($input_username !== $db_username && !empty($input_username));
            $cambia_password = !empty($input_password);


            if ($cambia_username && $cambia_password) {

                if (strlen($input_username) < 5 || strlen($input_password) < 8) { echo json_encode("error_invalid_data"); exit; }

                $hashed_password = password_hash($input_password, PASSWORD_ARGON2ID);
                $rdo = $daoProfile->update_user_full($id_usuario, $input_username, $hashed_password);

            } else if ($cambia_username) {
                // Canviar nomes username
                if (strlen($input_username) < 5) { echo json_encode("error_username_corto"); exit; }
                $rdo = $daoProfile->update_username_only($id_usuario, $input_username);

            } else if ($cambia_password) {
                // Canviar nomes contrasenya
                if (strlen($input_password) < 8) { echo json_encode("error_password_corta"); exit; }
                $hashed_password = password_hash($input_password, PASSWORD_ARGON2ID);
                $rdo = $daoProfile->update_password_only($id_usuario, $hashed_password);

            } else {
                echo json_encode("no_changes");
                exit;
            }

            if ($rdo) {
                echo json_encode("success");
            } else {
                echo json_encode("error_update");
            }
            exit;

        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }
        break;

        case 'get_liked_events':
        header('Content-Type: application/json');

        try {
            if (!isset($_POST['token']) || empty($_POST['token'])) {
                echo json_encode(["status" => "error", "message" => "No token provided"]);
                exit;
            }

            //decodificació del token
            $token_dec = decode_token($_POST['token']);
            if (!$token_dec) {
                echo json_encode(["status" => "error", "message" => "Token decoding failed"]);
                exit;
            }

            $username = null;
            if (is_array($token_dec) && isset($token_dec['username'])) {
                $username = $token_dec['username'];
            } elseif (is_object($token_dec) && isset($token_dec->username)) {
                $username = $token_dec->username;
            }

            if (!$username) {
                echo json_encode(["status" => "error", "message" => "Username not found in token payload"]);
                exit;
            }

            $daoProfile = new DAOProfile();
            $rdo = $daoProfile->select_liked_events($username);

            if (!$rdo || !is_array($rdo)) {
                echo json_encode([]);
            } else {
                echo json_encode($rdo);
            }
            exit;

        } catch (Exception $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
            exit;
        }
        break;
}