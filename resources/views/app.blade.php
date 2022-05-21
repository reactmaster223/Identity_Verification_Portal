<!DOCTYPE html>
<html lang="en">
<head>
    <title>养老协会从业人员身份验证管理平台</title>
    <link href='https://fonts.googleapis.com/css?family=Roboto:500,400,300,700' rel='stylesheet' type='text/css'>
    <script src="/assets/js/core/pace.js"></script>
    <link href="{{mix('/assets/css/laraspace.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('/assets/assets/css/animated.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('/assets/assets/css/dark.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('/assets/assets/css/skins.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('/assets/assets/css/style.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('/assets/assets/plugins/bootstrap/css/bootstrap.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('/assets/assets/plugins/web-fonts/icons.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('/assets/assets/plugins/web-fonts/plugins.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('/assets/assets/css/sidemenu.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('/assets/assets/plugins/p-scrollbar/p-scrollbar.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('/assets/assets/plugins/jvectormap/jqvmap.css')}}" rel="stylesheet" type="text/css">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="apple-touch-icon" sizes="57x57" href="/assets/img/favicons/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/assets/img/favicons/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/assets/img/favicons/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/favicons/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/assets/img/favicons/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/assets/img/favicons/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/assets/img/favicons/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/assets/img/favicons/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicons/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="/assets/img/favicons/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/assets/img/favicons/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="/assets/img/favicons/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="/assets/img/favicons/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/assets/img/favicons/manifest.json">
    <link rel="mask-icon" href="/assets/img/favicons/safari-pinned-tab.svg" color="#333333">
    <link rel="shortcut icon" href="/assets/img/favicons/favicon.ico">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" rel="stylesheet">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="msapplication-TileImage" content="/assets/img/favicons/mstile-144x144.png">
    <meta name="msapplication-config" content="/assets/img/favicons/browserconfig.xml">
    <meta name="theme-color" content="#333333">
</head>
<body class="layout-default skin-default">
<div id="app" class="site-wrapper">
    <div class="mobile-menu-overlay" @click.prevent="$utils.toggleSidebar"></div>
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
    <!-- <theme-switcher /> -->
</div>
<script type="text/javascript" src="{{mix('/assets/js/app.js')}}"></script>
<script type="text/javascript" src="{{asset('/assets/assets/js/vendors/jquery-3.5.1.min.js')}}"></script>
<script type="text/javascript" src="{{asset('/assets/assets/plugins/sidemenu/sidemenu.js')}}"></script>
</body>
</html>
