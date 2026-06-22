<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<!-- Ajax Promise -->
<script src="view/js/promises.js"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>

<!-- Security js-->
<script src="view/js/security.js"></script>
<script src="module/auth/view/activity_user.js"></script>
<script src="module/auth/view/middleware_auth.js"></script>

<!-- Search controller -->
<script src="module/search/model/controller_search.js"></script>

<?php
$page = $_GET['page'] ?? ($_GET['module'] ?? '');
if ($page === 'controller_auth') {
?>
<script src="module/auth/model/controller_auth.js"></script>
<script src="module/auth/model/controller_register.js"></script>
<?php } elseif ($page === 'controller_profile') { ?>
<script src="module/profile/model/controller_profile.js"></script>
<?php } else { ?>

<!-- Home controller -->
<script src="module/home/model/controller_home.js"></script>

<!-- Shop controller -->
<script src="module/shop/model/controller_shop.js"></script>
<?php } ?>

</main>
</body>
</html>
