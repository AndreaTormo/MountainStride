<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/CRUD/Mountain_stride_MVC_v11 - copia_filtros';
include($path . "/module/search/model/DAO_search.php");

switch ($_GET['op']) {
    case 'search_brand';
        $homeQuery = new DAO_search();
        $selSlide = $homeQuery -> search_brand();
        if (!empty($selSlide)) {
            echo json_encode($selSlide);
        }
        else {
            echo "error";
        }
        break;

    case 'search_category_null';
        $homeQuery = new DAO_search();
        $selSlide = $homeQuery -> search_category_null();
        if (!empty($selSlide)) {
            echo json_encode($selSlide);
        }
        else {
            echo "error";
        }
        break;

    case 'search_category';
        $homeQuery = new DAO_search();
        $selSlide = $homeQuery -> search_category($_POST['brand']);        
        if (!empty($selSlide)) {
            echo json_encode($selSlide);
        }
        else {
            echo "error";
        }
        break;

    case 'autocomplete';
        $complete = isset($_POST['complete']) ? trim($_POST['complete']) : '';
        if ($complete === '') {
            echo json_encode([]);
            break;
        }
        try{
            $dao = new DAO_search();
            if (!empty($_POST['brand']) && empty($_POST['category'])){
                $rdo = $dao->select_only_brand($complete, $_POST['brand']);
            }else if(!empty($_POST['brand']) && !empty($_POST['category'])){
                $rdo = $dao->select_brand_category($complete, $_POST['brand'], $_POST['category']);
            }else if(empty($_POST['brand']) && !empty($_POST['category'])){
                $rdo = $dao->select_only_category($_POST['category'], $complete);
            }else {
                $rdo = $dao->select_city($complete);
            }
        }catch (Exception $e){
            echo json_encode([]);
            break;
        }
        if (!isset($rdo) || !is_array($rdo)) {
            echo json_encode([]);
            break;
        }
        echo json_encode($rdo);
        break; 
}