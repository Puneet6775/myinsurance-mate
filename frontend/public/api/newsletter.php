<?php

require __DIR__ . '/bootstrap.php';

$data = json_input();
$email = email_field($data);

try {
    $stmt = db()->prepare('INSERT INTO subscribers (email) VALUES (?)');
    $stmt->execute([$email]);
    ok(['ok' => true, 'already' => false]);
} catch (PDOException $e) {
    if ((int) $e->errorInfo[1] === 1062) {
        ok(['ok' => true, 'already' => true]);
    }
    fail('Could not save subscriber.', 500);
}
