<?php

require __DIR__ . '/bootstrap.php';

$data = json_input();
$name = str_field($data, 'name', 1, 120);
$email = email_field($data);
$phone = str_field($data, 'phone', 8, 20);
$city = str_field($data, 'city', 1, 80);
$type = strtolower(str_field($data, 'insuranceType', 1, 40));
$notes = trim((string) ($data['notes'] ?? ''));
if (mb_strlen($notes) > 2000) {
    fail('notes is too long');
}
if (!in_array($type, ['motor', 'health', 'life'], true)) {
    fail('Choose motor, health or life', 422);
}

$stmt = db()->prepare(
    'INSERT INTO quotes (name, email, phone, city, insurance_type, notes, status)
     VALUES (?, ?, ?, ?, ?, ?, \'new\')'
);
$stmt->execute([$name, $email, $phone, $city, $type, $notes]);

ok(['ok' => true, 'id' => (int) db()->lastInsertId()]);
