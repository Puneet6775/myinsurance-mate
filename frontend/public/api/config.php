<?php
// Hostinger: hPanel → Databases. Copy these values after you create the database.
return [
    'host' => getenv('MYSQL_HOST') ?: 'localhost',
    'port' => (int) (getenv('MYSQL_PORT') ?: 3306),
    'name' => getenv('MYSQL_DB') ?: 'CHANGE_ME',
    'user' => getenv('MYSQL_USER') ?: 'CHANGE_ME',
    'pass' => getenv('MYSQL_PASSWORD') ?: 'CHANGE_ME',
];
