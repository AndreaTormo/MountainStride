<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/CRUD/Mountain_stride_MVC_v11 - copia_filtros';
include($path . "/model/connect.php");

class DAO_search {
    function search_brand(){
        $select = "SELECT id_circuit, circuit_name FROM circuits ORDER BY circuit_name ASC";
        $conexion = connect::con();
        $stmt = $conexion->prepare($select);
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }

    function search_category_null(){
        $select = "SELECT id_distance, distance_name FROM distance ORDER BY distance_name ASC";
        $conexion = connect::con();
        $stmt = $conexion->prepare($select);
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }

    function search_category($brand){
        $select = "SELECT DISTINCT d.id_distance, d.distance_name
                    FROM running r
                    INNER JOIN running_extras re ON r.id_running = re.id_running
                    INNER JOIN distance d ON re.id_distance = d.id_distance
                    INNER JOIN circuits c ON r.id_circuit = c.id_circuit
                    WHERE c.circuit_name = :brand
                    ORDER BY d.distance_name ASC";
        $conexion = connect::con();
        $stmt = $conexion->prepare($select);
        $stmt->execute([':brand' => $brand]);
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }

    function select_only_brand($complete, $brand){
        $select = "SELECT DISTINCT r.running_name
                    FROM running r
                    INNER JOIN circuits c ON r.id_circuit = c.id_circuit
                    WHERE c.circuit_name = :brand AND r.running_name LIKE :complete
                    ORDER BY r.running_name ASC";
        $conexion = connect::con();
        $stmt = $conexion->prepare($select);
        $stmt->execute([
            ':brand' => $brand,
            ':complete' => $complete . '%'
        ]);
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }

    function select_only_category($category, $complete){
        $select = "SELECT DISTINCT r.running_name
                    FROM running r
                    INNER JOIN running_extras re ON r.id_running = re.id_running
                    INNER JOIN distance d ON re.id_distance = d.id_distance
                    WHERE d.distance_name = :category AND r.running_name LIKE :complete
                    ORDER BY r.running_name ASC";
        $conexion = connect::con();
        $stmt = $conexion->prepare($select);
        $stmt->execute([
            ':category' => $category,
            ':complete' => $complete . '%'
        ]);
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }

    function select_brand_category($complete, $brand, $category){
        $select = "SELECT DISTINCT r.running_name
                    FROM running r
                    INNER JOIN running_extras re ON r.id_running = re.id_running
                    INNER JOIN circuits c ON r.id_circuit = c.id_circuit
                    INNER JOIN distance d ON re.id_distance = d.id_distance
                    WHERE c.circuit_name = :brand
                    AND d.distance_name = :category
                    AND r.running_name LIKE :complete
                    ORDER BY r.running_name ASC";
        $conexion = connect::con();
        $stmt = $conexion->prepare($select);
        $stmt->execute([
            ':brand' => $brand,
            ':category' => $category,
            ':complete' => $complete . '%'
        ]);
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }

    function select_city($complete){
        $select = "SELECT DISTINCT r.running_name
                    FROM running r
                    WHERE r.running_name LIKE :complete
                    ORDER BY r.running_name ASC";
        $conexion = connect::con();
        $stmt = $conexion->prepare($select);
        $stmt->execute([':complete' => $complete . '%']);
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }
}