<?php
// $data = 'hola crtl home';
// die('<script>console.log('.json_encode( $data ) .');</script>');

$path = $_SERVER['DOCUMENT_ROOT'] . '/CRUD/Mountain_stride_MVC_v11 - copia_filtros/';
include($path . "module/home/model/DAOHome.php");

@session_start();
 
switch ($_GET['op']) {
 
    case 'view':
        $filter_key = $_GET['filter_key'] ?? null;
        $filter_val = $_GET['filter_val'] ?? null;
        include("module/home/view/home.html");
        break;
 
    case 'homePageRunning':
        try {
            $daohome = new DAOHome();
            $SelectRunning = $daohome->select_all_running();
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
          if(!empty($SelectRunning)){
            echo json_encode($SelectRunning); 
        }
        else{
            echo json_encode("error");
        }
        break;
 
    case 'homePageCircuits':
        try {
            $daohome = new DAOHome();
            $SelectCircuits = $daohome->select_all_circuits();
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        if(!empty($SelectCircuits)){
            echo json_encode($SelectCircuits); 
        }
        else{
            echo json_encode("error");
        }
        break;
 
    case 'homePageDistance':
        try {
            $daohome = new DAOHome();
            $SelectDistance = $daohome->select_all_distance();
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        if(!empty($SelectDistance)){
            echo json_encode($SelectDistance); 
        }
        else{
            echo json_encode("error");
        }
        break;
 
    case 'homePageLand':
        try {
            $daohome = new DAOHome();
            $SelectLand = $daohome->select_all_land();
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        if(!empty($SelectLand)){
            echo json_encode($SelectLand); 
        }
        else{
            echo json_encode("error");
        }
        break;
 
    case 'homePageRunners':
        try {
            $daohome = new DAOHome();
            $SelectRunners = $daohome->select_all_runners();
        } catch (Exception $e) {
            echo json_encode("error"); exit;
        }
        if(!empty($SelectRunners)){
            echo json_encode($SelectRunners); 
        }
        else{
            echo json_encode("error");
        }
        break;
 
    default:
        include("view/inc/error404.php");
        break;
}
?>