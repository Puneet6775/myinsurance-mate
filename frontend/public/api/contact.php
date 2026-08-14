<?php

require __DIR__ . '/bootstrap.php';

$data = json_input();
$first = str_field($data, 'firstName', 1, 80);
$last = str_field($data, 'lastName', 1, 80);
$email = email_field($data);
$phone = str_field($data, 'phone', 8, 20);
$subject = str_field($data, 'subject', 1, 160);
$message = str_field($data, 'message', 4, 4000);

$stmt = db()->prepare(
    'INSERT INTO contacts (first_name, last_name, email, phone, subject, message, status)
     VALUES (?, ?, ?, ?, ?, ?, \'new\')'
);
$stmt->execute([$first, $last, $email, $phone, $subject, $message]);

ok(['ok' => true, 'id' => (int) db()->lastInsertId()]);
