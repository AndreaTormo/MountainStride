<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
 
<!-- Ajax Promise helper -->
<script src="view/js/promises.js"></script>

<?php
$page = $_GET['page'] ?? ($_GET['module'] ?? '');
if ($page === 'controller_login') {
?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
<script src="module/login/model/controller_login.js"></script>
<script src="module/login/model/controller_register.js"></script>
<?php } else { ?>
<!-- Home controller -->
<script src="module/home/model/controller_home.js"></script>

<!-- Search controller -->
<script src="module/search/model/controller_search.js"></script>
  
<!-- Shop controller -->
<script src="module/shop/model/controller_shop.js"></script>
<?php } ?>
 
</main>
</body>
</html>
