<?php
$path = 'C:/wamp64/www/CRUD/Mountain_stride_MVC_v11 - copia_filtros/';
include($path . "model/connect.php");

class DAOHome {
	function select_all_running()
        {
        $sql = "SELECT * FROM running";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
        }

	 function select_all_circuits()
        {
        $sql = "SELECT * FROM circuits";
        $conexion = connect::con();
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        connect::close($conexion);
        return $res;
        }

	function select_all_distance(){
                $sql = "SELECT d.*
                        FROM distance d
                        INNER JOIN (
                        SELECT distance_name, MAX(id_distance) AS max_id
                        FROM distance
                        GROUP BY distance_name
                        ) latest
                        ON latest.max_id = d.id_distance
                        ORDER BY d.id_distance ASC";
                $conexion = connect::con();
                $stmt = $conexion->prepare($sql);
                $stmt->execute();
                $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
                connect::close($conexion);
                return $res;
                }

	function select_all_land(){
                $sql = "SELECT * FROM land";
                $conexion = connect::con();
                $stmt = $conexion->prepare($sql);
                $stmt->execute();
                $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
                connect::close($conexion);
                return $res;
                }
 
        function select_all_runners(){
                $sql = "SELECT * FROM runners ORDER BY runner_wins DESC, runner_km DESC, runner_name ASC";
                $conexion = connect::con();
                $stmt = $conexion->prepare($sql);
                $stmt->execute();
                $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
                connect::close($conexion);
                return $res;
                }
        function select_most_visited(){
		$sql = "SELECT r.id_running, r.running_name, r.running_image, r.race_date, r.price, r.visit_count,
				c.circuit_name, c.circuit_image
			FROM running r
			INNER JOIN circuits c ON r.id_circuit = c.id_circuit
			ORDER BY r.visit_count DESC, r.id_running ASC
			LIMIT 4";
		$conexion = connect::con();
		$stmt = $conexion->prepare($sql);
		$stmt->execute();
		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		connect::close($conexion);
		return $res;
	}	
        }