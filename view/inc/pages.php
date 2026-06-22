<?php
if (isset($_GET['module']) && !isset($_GET['page'])) {
	$_GET['page'] = $_GET['module'];
}
if(isset($_GET['page'])){
	switch($_GET['page']){
		case "controller_home";
			include("module/home/controller/".$_GET['page'].".php");
			break;
		case "controller_shop":
    		include("module/shop/controller/controller_shop.php");
    		break;
		case "controller_auth":
    		include("module/auth/controller/controller_auth.php");
    		break;
    	case "controller_profile":
    		include("module/profile/controller/controller_profile.php");
    		break;
		case "404";
			include("view/inc/error".$_GET['page'].".php");
			break;
		case "503";
			include("view/inc/error".$_GET['page'].".php");
			break;
		default;
			header('Location: index.php?page=controller_home&op=view');
			break;
	}
}else{
	// include("module/inicio/view/inicio.php");
	header('Location: index.php?page=controller_home&op=view');
	exit();
}
?>