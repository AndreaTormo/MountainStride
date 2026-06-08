<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/CRUD/Mountain_stride_MVC_v11 - copia_filtros/';
include($path . "model/connect.php");

// Decodifica el token base64 del proyecto (formato: base64(username.timestamp))
function decode_token($token) {
    $decoded = base64_decode($token);
    $dotPos  = strpos($decoded, '.');
    if ($dotPos === false || $dotPos === 0) return false;
    return ['username' => substr($decoded, 0, $dotPos)];
}

class DAOProfile {

    function select_data_user($username) {
        $sql = "SELECT * FROM users WHERE username = :username";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':username' => $username]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res ? $res : "error_user";
    }

    function update_username_only($id_usuario, $username) {
        $sql = "UPDATE users SET username = :username WHERE id_user = :id";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $res = $stmt->execute([':username' => $username, ':id' => $id_usuario]);
        connect::close($conexion);
        return $res;
    }

    function update_password_only($id_usuario, $password) {
        $sql = "UPDATE users SET password = :password WHERE id_user = :id";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $res = $stmt->execute([':password' => $password, ':id' => $id_usuario]);
        connect::close($conexion);
        return $res;
    }

    function update_user_full($id_usuario, $username, $password) {
        $sql = "UPDATE users SET username = :username, password = :password WHERE id_user = :id";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $res = $stmt->execute([':username' => $username, ':password' => $password, ':id' => $id_usuario]);
        connect::close($conexion);
        return $res;
    }

    function select_liked_events($username) {
        $sql = "SELECT r.id_running, r.running_name, r.running_image, r.race_date, r.price,
                       c.circuit_name
                FROM likes l
                INNER JOIN users u ON l.id_user = u.id_user
                INNER JOIN running r ON l.id_running = r.id_running
                INNER JOIN circuits c ON r.id_circuit = c.id_circuit
                WHERE u.username = :username";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':username' => $username]);
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }
}
