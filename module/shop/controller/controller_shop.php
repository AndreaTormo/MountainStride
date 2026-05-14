<?php
$path = 'C:/wamp64/www/CRUD/Mountain_stride_MVC_v11 - copia_filtros/';
include($_SERVER['DOCUMENT_ROOT'] . '/CRUD/Mountain_stride_MVC_v11 - copia_filtros/module/shop/model/DAO_shop.php');

@session_start();
 
switch ($_GET['op']) {
 
    case 'view':
        include('module/shop/view/shop.html');
        break;
 
    case 'all_running':
        try {
            $limit  = isset($_POST['limit']) ? (int)$_POST['limit'] : 8;
            $offset = isset($_POST['offset']) ? (int)$_POST['offset'] : 0;
            $order  = isset($_POST['order']) ? (string)$_POST['order'] : '';
            $daoshop       = new DAOShop();
            $Dates_Running = $daoshop->select_all_runnings($limit, $offset, $order);
            $Total_Running = $daoshop->select_count_all_events();
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        echo json_encode([
            'items' => $Dates_Running ?: [],
            'total' => $Total_Running
        ]);
        break;

    case 'all_running_map':
        try {
            $daoshop   = new DAOShop();
            $mapEvents = $daoshop->select_all_runnings();
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        echo json_encode($mapEvents ?: []);
        break;
 
    case 'all_circuits':
        try {
            $daoshop        = new DAOShop();
            $Dates_Circuits = $daoshop->select_all_circuits();
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        echo !empty($Dates_Circuits) ? json_encode($Dates_Circuits) : json_encode("error");
        break;
 
    case 'all_distance':
        try {
            $daoshop        = new DAOShop();
            $Dates_Distance = $daoshop->select_all_distance();
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        echo !empty($Dates_Distance) ? json_encode($Dates_Distance) : json_encode("error");
        break;
 
    case 'all_land':
        try {
            $daoshop    = new DAOShop();
            $Dates_Land = $daoshop->select_all_land();
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        echo !empty($Dates_Land) ? json_encode($Dates_Land) : json_encode("error");
        break;
 
    case 'all_runners':
        try {
            $daoshop       = new DAOShop();
            $Dates_Runners = $daoshop->select_all_runners();
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        echo !empty($Dates_Runners) ? json_encode($Dates_Runners) : json_encode("error");
        break;
 
    case 'details_running':
        try {
            $daoshop      = new DAOShop();
            $Date_running = $daoshop->select_one_running($_GET['id']);
            $Date_images  = $daoshop->select_imgs_running($_GET['id']);
            $Date_extras  = $daoshop->select_extras_running($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        if (!empty($Date_running)) {
            $rdo      = [];
            $rdo[0]   = $Date_running;
            $rdo[1][] = $Date_images;
            $rdo[2]   = $Date_extras;
            echo json_encode($rdo);
        } else {
            echo json_encode("error");
        }
        break;
 
    case 'details_circuits':
        try {
            $daoshop        = new DAOShop();
            $Dates_Circuits = $daoshop->select_one_circuit($_GET['id']);
            $Date_images    = $daoshop->select_imgs_circuit($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        if (!empty($Dates_Circuits)) {
            $rdo      = [];
            $rdo[0]   = $Dates_Circuits;
            $rdo[1][] = $Date_images;
            echo json_encode($rdo);
        } else {
            echo json_encode("error");
        }
        break;
 
    case 'details_distance':
        try {
            $daoshop        = new DAOShop();
            $Dates_Distance = $daoshop->select_one_distance($_GET['id']);
            $Date_images    = $daoshop->select_imgs_distance($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        if (!empty($Dates_Distance)) {
            $rdo      = [];
            $rdo[0]   = $Dates_Distance;
            $rdo[1][] = $Date_images;
            echo json_encode($rdo);
        } else {
            echo json_encode("error");
        }
        break;
 
    case 'details_land':
        try {
            $daoshop     = new DAOShop();
            $Dates_Land  = $daoshop->select_one_land($_GET['id']);
            $Date_images = $daoshop->select_imgs_land($_GET['id']);
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        if (!empty($Dates_Land)) {
            $rdo      = [];
            $rdo[0]   = $Dates_Land;
            $rdo[1][] = $Date_images;
            echo json_encode($rdo);
        } else {
            echo json_encode("error");
        }
        break;
 
    // ── FILTROS ───────────────────────────────────────────────────────────────
    case 'filter':        
        //  echo json_encode($_POST['filter']); exit;            
        try {
            $limit  = isset($_POST['limit']) ? (int)$_POST['limit'] : 8;
            $offset = isset($_POST['offset']) ? (int)$_POST['offset'] : 0;
            $daoshop  = new DAOShop();     
            $selSlide = $daoshop->filters($_POST['filter'], $limit, $offset);
            $total    = $daoshop->select_count_filtered_events($_POST['filter']);
            echo json_encode([
                'items' => $selSlide ?: [],
                'total' => $total
            ]);
            exit;
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        echo !empty($selSlide) ? json_encode($selSlide) : json_encode("error");
        break;

    case 'filter_map':
        try {
            $daoshop  = new DAOShop();
            $selSlide = $daoshop->filters($_POST['filter']);
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        echo json_encode($selSlide ?: []);
        break;
 
        default:
            echo json_encode("error: operación no reconocida");
            break;

    case 'load_salto':
        try {
            $daoshop = new DAOShop();
            $SelectSalto = $daoshop->load_salto(
                json_decode($_POST['filter'], true),
                $_POST['total_prod'],
                $_POST['items_page']
            );
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        echo !empty($SelectSalto) ? json_encode($SelectSalto) : json_encode("error");
        break; 
        
    case 'count_running_related':
        $type_car = $_POST['running_event'];
        try {
            $dao = new DAOShop();
            $rdo = $dao->count_more_running_related($running_event);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }
        if (!$rdo) {
            echo json_encode("error");
            exit;
        } else {
            $dinfo = array();
            foreach ($rdo as $row) {
                array_push($dinfo, $row);
            }
            echo json_encode($dinfo);
        }
        break;

    case 'runnings_related':
        $type_running = $_POST['type'];
        $loaded = $_POST['loaded'];
        $items = $_POST['items'];
        try {
            $dao = new DAOShop();
            $rdo = $dao->select_runnings_related($type_running, $loaded, $items);
        } catch (Exception $e) {
            echo json_encode("error");
            exit;
        }
        if (!$rdo) {
            echo json_encode("error");
            exit;
        } else {
            $dinfo = array();
            foreach ($rdo as $row) {
                array_push($dinfo, $row);
            }
            echo json_encode($dinfo);
        }
        break;

    // default;
    //     include("module/exceptions/views/pages/error404.php");
    //     break;

}

?>