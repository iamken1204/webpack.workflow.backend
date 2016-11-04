<?php $webpack = new \app\helpers\Webpack($this) ?>
<link rel="stylesheet" href="/dist/vendors.css">
<?php $webpack->render('css') ?>
<script src="/dist/vendors.js"></script>
<?php $webpack->render('js') ?>
