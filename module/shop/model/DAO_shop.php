<?php
$path = 'C:/wamp64/www/CRUD/Mountain_stride_MVC_v11 - copia_filtros';
include($path . "/model/connect.php");

 
class DAOShop {
 
    function select_all_runnings($limit = null, $offset = null) {
        $sql = "SELECT r.*, l.land_name, c.circuit_name
                FROM running r
                LEFT JOIN land l ON r.id_land = l.id_land
                LEFT JOIN circuits c ON r.id_circuit = c.id_circuit
                ORDER BY r.id_running DESC";

        if ($limit !== null && $offset !== null) {
            $sql .= " LIMIT :limit OFFSET :offset";
        }
 
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        if ($limit !== null && $offset !== null) {
            $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
            $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
        }
        $stmt->execute();
        $retrArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $retrArray;
    }
 
    function select_all_circuits() {
        $sql = "SELECT * FROM circuits ORDER BY circuit_name ASC";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        $retrArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $retrArray;
    }
 
    function select_all_distance() {
        $sql = "SELECT * FROM distance ORDER BY distance_name ASC";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        $retrArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $retrArray;
    }
 
    function select_all_land() {
        $sql = "SELECT * FROM land ORDER BY land_name ASC";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        $retrArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $retrArray;
    }
 
    function select_all_runners() {
        $sql = "SELECT * FROM runners ORDER BY runner_name ASC";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        $retrArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $retrArray;
    }
 
    function select_one_running($id) {
        $sql = "SELECT * FROM running WHERE id_running = :id";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':id' => $id]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }
 
    function select_extras_running($id) {
        $sql = "SELECT re.*, c.circuit_name, d.distance_name, l.land_name
                FROM running_extras re
                LEFT JOIN circuits c ON re.id_circuit = c.id_circuit
                LEFT JOIN distance d ON re.id_distance = d.id_distance
                LEFT JOIN land l ON re.id_land = l.id_land
                WHERE re.id_running = :id";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':id' => $id]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }
 
    function select_one_circuit($id) {
        $sql = "SELECT * FROM circuits WHERE id_circuit = :id";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':id' => $id]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }
 
    function select_one_distance($id) {
        $sql = "SELECT * FROM distance WHERE id_distance = :id";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':id' => $id]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }
 
    function select_one_land($id) {
        $sql = "SELECT * FROM land WHERE id_land = :id";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':id' => $id]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }
 
    function select_one_runner($id) {
        $sql = "SELECT * FROM runners WHERE id_runner = :id";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':id' => $id]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }
 
    function select_imgs_running($id) {
        $sql = "SELECT image_url FROM running_images WHERE id_running = :id ORDER BY sort_order ASC";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':id' => $id]);
        $imgArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $imgArray;
    }
 
    function select_imgs_circuit($id) {
        $sql = "SELECT id_circuit, circuits_image FROM circuits WHERE id_circuit = :id";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':id' => $id]);
        $imgArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $imgArray;
    }
 
    function select_imgs_distance($id) {
        $sql = "SELECT id_distance, distance_image FROM distance WHERE id_distance = :id";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':id' => $id]);
        $imgArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $imgArray;
    }
 
    function select_imgs_land($id) {
        $sql = "SELECT id_land, land_image FROM land WHERE id_land = :id";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':id' => $id]);
        $imgArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $imgArray;
    }
 
    function select_imgs_runners($id) {
        $sql = "SELECT id_runner, runner_image FROM runners WHERE id_runner = :id";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':id' => $id]);
        $imgArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $imgArray;
    }

    function filters($filter, $limit = null, $offset = null) {
        $consulta = "SELECT DISTINCT r.*, l.land_name, c.circuit_name
                    FROM running r
                    LEFT JOIN land l ON r.id_land = l.id_land
                    LEFT JOIN circuits c ON r.id_circuit = c.id_circuit
                    LEFT JOIN running_extras  ON r.id_running = running_extras.id_running
                    LEFT JOIN distance d ON running_extras.id_distance = d.id_distance";
        $conditions = [];

        for ($i = 0; $i < count($filter); $i++) {
            $key   = $filter[$i][0];
            $value = $filter[$i][1];

            if ($key === 'price_max') {
                $conditions[] = "r.price <= " . (int)$value;
                continue;
            }

            if ($key === 'circuit_name') {
                    $conditions[] = "c.$key = '" . addslashes($value) . "'";
                } elseif ($key === 'land_name') {
                    $conditions[] = "l.$key = '" . addslashes($value) . "'";
                } elseif ($key === 'distance_name') {
                    $conditions[] = "d.$key = '" . addslashes($value) . "'";
                } elseif ($key === 'id_runner') {   
                    $conditions[] = "rn.id_runner = '" . addslashes($value) . "'";
                } else {
                    $conditions[] = "r.$key = '" . addslashes($value) . "'";
                }
            }

        if (!empty($conditions)) {
            $consulta .= " WHERE " . implode(" AND ", $conditions);
        }
        $consulta .= " ORDER BY r.id_running DESC";
        if ($limit !== null && $offset !== null) {
            $consulta .= " LIMIT :limit OFFSET :offset";
        }
        
        $conexion = connect::con();
        $stmt = $conexion->prepare($consulta);
        if ($limit !== null && $offset !== null) {
            $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
            $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
        }
        $stmt->execute();
        $retrArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $retrArray;
    }

    function load_salto($filter, $total_prod, $items_page) {
        $sql = "SELECT r.*, c.circuit_name, l.land_name
                FROM running r
                LEFT JOIN circuits c ON r.id_circuit = c.id_circuit
                LEFT JOIN land l ON r.id_land = l.id_land
                WHERE 1=1";

        if ($filter[0]['id_running']) {
            $val = $filter[0]['id_running'][0];
            $sql .= " AND r.id_running = '$val'";
        }
        else if ($filter[0]['id_circuit']) {
            $val = $filter[0]['id_circuit'][0];
            $sql .= " AND r.id_circuit = '$val'";
        }
        else if ($filter[0]['id_distance']) {
            $val = $filter[0]['id_distance'][0];
            $sql  = "SELECT r.*, c.circuit_name, l.land_name
                    FROM running r
                    LEFT JOIN circuits c ON r.id_circuit = c.id_circuit
                    LEFT JOIN land l ON r.id_land = l.id_land
                    INNER JOIN running_extras re ON r.id_running = re.id_running
                    WHERE re.id_distance = '$val'";
        }
        else if ($filter[0]['id_land']) {
            $val = $filter[0]['id_land'][0];
            $sql .= " AND r.id_land = '$val'";
        }

        $sql .= " LIMIT $total_prod, $items_page";

        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
    }

    function select_count_all_events(){
        $sql = "SELECT COUNT(DISTINCT r.id_running) AS total
        FROM running r
        LEFT JOIN land l ON r.id_land = l.id_land
        LEFT JOIN circuits c ON r.id_circuit = c.id_circuit";

        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return (int)($row['total'] ?? 0);
    }

    function select_count_filtered_events($filter) {
        $consulta = "SELECT COUNT(DISTINCT r.id_running) AS total
                    FROM running r
                    LEFT JOIN land l ON r.id_land = l.id_land
                    LEFT JOIN circuits c ON r.id_circuit = c.id_circuit
                    LEFT JOIN running_extras ON r.id_running = running_extras.id_running
                    LEFT JOIN distance d ON running_extras.id_distance = d.id_distance";
        $conditions = [];

        for ($i = 0; $i < count($filter); $i++) {
            $key   = $filter[$i][0];
            $value = $filter[$i][1];

            if ($key === 'price_max') {
                $conditions[] = "r.price <= " . (int)$value;
                continue;
            }

            if ($key === 'circuit_name') {
                $conditions[] = "c.$key = '" . addslashes($value) . "'";
            } elseif ($key === 'land_name') {
                $conditions[] = "l.$key = '" . addslashes($value) . "'";
            } elseif ($key === 'distance_name') {
                $conditions[] = "d.$key = '" . addslashes($value) . "'";
            } elseif ($key === 'id_runner') {
                $conditions[] = "rn.id_runner = '" . addslashes($value) . "'";
            } else {
                $conditions[] = "r.$key = '" . addslashes($value) . "'";
            }
        }

        if (!empty($conditions)) {
            $consulta .= " WHERE " . implode(" AND ", $conditions);
        }

        $conexion = connect::con();
        $stmt = $conexion->prepare($consulta);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return (int)($row['total'] ?? 0);
    }

    function count_more_runnings_related($status) {
        $sql = "SELECT COUNT(*) AS n_prod
                FROM running r
                WHERE r.status = :status";

        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute([':status' => $status]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res ? (int)$res['n_prod'] : 0;
    }

    function select_runnings_related($status, $loaded, $items) {
        $sql = "SELECT r.*, l.land_name, c.circuit_name
                FROM running r
                LEFT JOIN land l ON r.id_land = l.id_land
                LEFT JOIN circuits c ON r.id_circuit = c.id_circuit
                WHERE r.status = :status
                LIMIT :loaded, :items";

        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->bindValue(':status', $status, PDO::PARAM_STR);
        $stmt->bindValue(':loaded', (int)$loaded, PDO::PARAM_INT);
        $stmt->bindValue(':items',  (int)$items,  PDO::PARAM_INT);
        $stmt->execute();
        $retrArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $retrArray;
    }

    function count_all_running_order($order) {
        $sql = "SELECT COUNT(*) AS n_prod
		FROM running r, land l, circuits c
		WHERE r.id_land = l.id_land
		  AND r.id_circuit = c.id_circuit
		ORDER BY r.$order ASC";

        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);

        $retrArray = array();
        if (!empty($res)) {
            foreach ($res as $row) {
                $retrArray[] = $row;
            }
        }
        return $retrArray;
    }
}
?>

 