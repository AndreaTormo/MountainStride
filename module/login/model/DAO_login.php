<?php
$path = 'C:/wamp64/www/CRUD/Mountain_stride_MVC_v11 - copia_filtros/';
include($path . "model/connect.php");

class DAOLogin {

    function select_email($email) {
        $sql = "SELECT email FROM users WHERE email = :email";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':email' => $email]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }

    function insert_user($username, $email, $password) {
        $hashed_pass = password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);
        $hashavatar = md5(strtolower(trim($email)));
        $avatar = "https://i.pravatar.cc/500?u=$hashavatar";
        $sql = "INSERT INTO users (username, password, email, type_user, avatar)
                VALUES (:username, :password, :email, 'client', :avatar)";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $res = $stmt->execute([
            ':username' => $username,
            ':password' => $hashed_pass,
            ':email' => $email,
            ':avatar' => $avatar
        ]);
        connect::close($conexion);
        return $res;
    }

    function select_user($username) {
        $sql = "SELECT username, password, email, type_user, avatar FROM users WHERE username = :username";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':username' => $username]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);

        if ($res) {
            return $res;
        } else {
            return "error_user";
        }
    }

    function select_data_user($username) {
        $sql = "SELECT * FROM users WHERE username = :username";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':username' => $username]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }

}
