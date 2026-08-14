<?php

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['detail' => 'Method not allowed']);
    exit;
}

function json_input(): array
{
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '', true);
    return is_array($data) ? $data : [];
}

function fail(string $message, int $code = 400): void
{
    http_response_code($code);
    echo json_encode(['detail' => $message]);
    exit;
}

function ok(array $payload): void
{
    echo json_encode($payload);
    exit;
}

function str_field(array $data, string $key, int $min, int $max): string
{
    $value = trim((string) ($data[$key] ?? ''));
    $len = mb_strlen($value);
    if ($len < $min || $len > $max) {
        fail("$key is required");
    }
    return $value;
}

function email_field(array $data, string $key = 'email'): string
{
    $email = strtolower(trim((string) ($data[$key] ?? '')));
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        fail('Enter a valid email');
    }
    return $email;
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $cfg = require __DIR__ . '/config.php';
    if (($cfg['name'] ?? '') === 'CHANGE_ME' || ($cfg['user'] ?? '') === 'CHANGE_ME') {
        fail('MySQL is not configured. Edit api/config.php with your Hostinger database details.', 503);
    }

    try {
        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4',
            $cfg['host'],
            (int) $cfg['port'],
            $cfg['name']
        );
        $pdo = new PDO($dsn, $cfg['user'], $cfg['pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    } catch (PDOException $e) {
        fail('Could not connect to MySQL.', 503);
    }

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS contacts (
          id INT UNSIGNED NOT NULL AUTO_INCREMENT,
          first_name VARCHAR(80) NOT NULL,
          last_name VARCHAR(80) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          subject VARCHAR(160) NOT NULL,
          message TEXT NOT NULL,
          status VARCHAR(20) NOT NULL DEFAULT 'new',
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          KEY idx_contacts_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS quotes (
          id INT UNSIGNED NOT NULL AUTO_INCREMENT,
          name VARCHAR(120) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          city VARCHAR(80) NOT NULL,
          insurance_type VARCHAR(40) NOT NULL,
          notes TEXT,
          status VARCHAR(20) NOT NULL DEFAULT 'new',
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          KEY idx_quotes_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS subscribers (
          id INT UNSIGNED NOT NULL AUTO_INCREMENT,
          email VARCHAR(255) NOT NULL,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          UNIQUE KEY uq_subscribers_email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    return $pdo;
}
