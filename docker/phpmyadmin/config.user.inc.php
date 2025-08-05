<?php

$cfg['ServerDefault'] = 1; // Set the default server

$cfg['Servers'][1]['hide_db'] = '^(mysql|information_schema|performance_schema|sys)$';
$cfg['Servers'][1]['auth_type'] = 'cookie';
$cfg['Servers'][1]['user'] = '';
$cfg['Servers'][1]['password'] = '';
$cfg['Servers'][1]['AllowArbitraryServer'] = true; // Disable arbitrary server option
$cfg['Servers'][1]['LoginCookieValidity'] = 1800; // Set the login cookie validity time in seconds (optional)
$cfg['Servers'][1]['PmaAbsoluteUri'] = 'http://localhost:5010/';
$cfg['Servers'][1]['LoginCookieURL'] = '/';
//$cfg['Servers'] = [];


