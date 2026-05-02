<?php
/**
 * Enhanced Elasticsearch Honeypot v2.0
 * honeyphp - Port 9500
 * Combined features from Elastichoney and ElasticPot
 */

$CONFIG = [
    'port' => 9500,
    'version' => '7.17.0',
    'cluster_name' => 'elasticsearch-prod',
    'node_name' => 'node-1',
    'node_id' => 'dXpvUEsyUXF6TjRSODEyN2Z2MFg=',
    'log_file' => '/var/log/honeyphp/honeyphp.log',
    'alert_file' => '/var/log/honeyphp/honeyphp_alerts.log',
    'detailed_log' => '/var/log/honeyphp/honeyphp_detailed.log'
];

@mkdir(dirname($CONFIG['log_file']), 0777, true);

function log_attack($type, $details) {
    global $CONFIG;
    $timestamp = date('Y-m-d H:i:s');
    $client_ip = get_client_ip();
    $log_entry = "[{$timestamp}] [{$type}] IP: {$client_ip} | Details: " . json_encode($details) . "\n";
    file_put_contents($CONFIG['log_file'], $log_entry, FILE_APPEND);
}

function get_client_ip() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

header('Server: Apache');
header("X-elastic-product: Elasticsearch");

$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];
$request_path = parse_url($request_uri, PHP_URL_PATH);
$request_query = parse_url($request_uri, PHP_URL_QUERY);
$request_body = file_get_contents('php://input');

if ($request_method === 'GET') {
    handle_get_request($request_path, $request_query, $request_uri);
} elseif ($request_method === 'POST') {
    handle_post_request($request_path, $request_body);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

function handle_get_request($path, $query, $request_uri) {
    global $CONFIG;
    
    if ($path === '/' || $path === '' || $path === '/index.php') {
        header('Content-Type: application/json');
        http_response_code(200);
        log_attack('INFO_REQUEST', ['type' => 'root', 'path' => $path]);
        echo json_encode([
            'name' => $CONFIG['node_name'],
            'cluster_name' => $CONFIG['cluster_name'],
            'cluster_uuid' => 'xQv_8aSuQ6OU-bAW4y5Vxg',
            'version' => [
                'number' => $CONFIG['version'],
                'build_flavor' => 'default',
                'build_type' => 'docker',
                'build_hash' => '7ec3a03',
                'build_date' => '2021-04-19T20:42:05.669758Z',
                'build_snapshot' => false,
                'lucene_version' => '9.5.0',
                'minimum_wire_compatibility_version' => '7.17.0',
                'minimum_index_compatibility_version' => '7.0.0'
            ],
            'tagline' => 'You Know, for Search'
        ]);
        return;
    }
    
    if (preg_match('#^/_cluster/health#', $path)) {
        header('Content-Type: application/json');
        http_response_code(200);
        log_attack('CLUSTER_HEALTH', ['path' => $path]);
        echo json_encode([
            'cluster_name' => $CONFIG['cluster_name'],
            'status' => 'green',
            'timed_out' => false,
            'number_of_nodes' => 3,
            'number_of_data_nodes' => 3,
            'active_primary_shards' => 45,
            'active_shards' => 135,
            'relocating_shards' => 0,
            'initializing_shards' => 0,
            'unassigned_shards' => 0,
            'delayed_unassigned_shards' => 0,
            'number_of_pending_tasks' => 0,
            'number_of_in_flight_fetch' => 0,
            'task_max_waiting_in_queue_millis' => 0,
            'active_shards_percent_as_number' => 100.0
        ]);
        return;
    }
    
    if (preg_match('#^/_nodes#', $path)) {
        header('Content-Type: application/json');
        http_response_code(200);
        log_attack('NODES_INFO', ['path' => $path]);
        echo json_encode([
            '_nodes' => ['total' => 3, 'successful' => 3, 'failed' => 0],
            'cluster_name' => $CONFIG['cluster_name'],
            'nodes' => [
                'dXpvUEsyUXF6TjRSODEyN2Z2MFg=' => [
                    'name' => 'node-1',
                    'transport_address' => '172.17.0.2:9300',
                    'host' => '172.17.0.2',
                    'ip' => '172.17.0.2',
                    'version' => $CONFIG['version'],
                    'build_hash' => '7ec3a03',
                    'http_address' => '172.17.0.2:9200'
                ],
                'node2_id' => [
                    'name' => 'node-2',
                    'transport_address' => '172.17.0.3:9300',
                    'host' => '172.17.0.3',
                    'ip' => '172.17.0.3',
                    'version' => $CONFIG['version'],
                    'build_hash' => '7ec3a03',
                    'http_address' => '172.17.0.3:9200'
                ],
                'node3_id' => [
                    'name' => 'node-3',
                    'transport_address' => '172.17.0.4:9300',
                    'host' => '172.17.0.4',
                    'ip' => '172.17.0.4',
                    'version' => $CONFIG['version'],
                    'build_hash' => '7ec3a03',
                    'http_address' => '172.17.0.4:9200'
                ]
            ]
        ]);
        return;
    }
    
    if (preg_match('#/_search|/user/_search#', $path)) {
        header('Content-Type: application/json');
        http_response_code(200);
        
        if (stripos($request_uri, 'script') !== false || stripos($request_uri, 'eval') !== false || stripos($request_uri, 'painless') !== false) {
            log_attack('RCE_ATTEMPT', ['path' => $path, 'query' => $query, 'type' => 'script_injection']);
        } else {
            log_attack('SEARCH_QUERY', ['path' => $path, 'query' => $query, 'type' => 'user_search']);
        }
        
        echo json_encode([
            'took' => 45,
            'timed_out' => false,
            '_shards' => ['total' => 5, 'successful' => 5, 'skipped' => 0, 'failed' => 0],
            'hits' => [
                'total' => ['value' => 1234, 'relation' => 'eq'],
                'max_score' => 1.0,
                'hits' => [
                    [
                        '_index' => 'user',
                        '_type' => '_doc',
                        '_id' => '1',
                        '_score' => 1.0,
                        '_source' => [
                            'id' => 1,
                            'username' => 'admin',
                            'email' => 'admin@example.com',
                            'surname' => 'Administrator',
                            'created_at' => '2021-01-01T00:00:00Z'
                        ]
                    ],
                    [
                        '_index' => 'user',
                        '_type' => '_doc',
                        '_id' => '2',
                        '_score' => 0.9,
                        '_source' => [
                            'id' => 2,
                            'username' => 'user123',
                            'email' => 'user@example.com',
                            'surname' => 'TestUser',
                            'created_at' => '2021-01-02T00:00:00Z'
                        ]
                    ]
                ]
            ]
        ]);
        return;
    }
    
    if (preg_match('#^/([a-z0-9_-]+)/?$#i', $path, $matches)) {
        header('Content-Type: application/json');
        http_response_code(200);
        $index = $matches[1];
        log_attack('INDEX_INFO', ['index' => $index]);
        
        echo json_encode([
            $index => [
                'aliases' => [],
                'mappings' => [
                    'properties' => [
                        'id' => ['type' => 'integer'],
                        'username' => ['type' => 'keyword'],
                        'email' => ['type' => 'keyword'],
                        'surname' => ['type' => 'text'],
                        'created_at' => ['type' => 'date']
                    ]
                ],
                'settings' => [
                    'index' => [
                        'creation_date' => '1609459200000',
                        'number_of_shards' => '5',
                        'number_of_replicas' => '1',
                        'uuid' => 'a1b2c3d4e5f6g7h8'
                    ]
                ]
            ]
        ]);
        return;
    }
    
    if (preg_match('#^/([a-z0-9_-]+)/([a-z0-9_-]+)/?$#i', $path, $matches)) {
        header('Content-Type: application/json');
        http_response_code(404);
        $index = $matches[1];
        $field = $matches[2];
        log_attack('CUSTOM_QUERY', ['index' => $index, 'field' => $field, 'path' => $path]);
        
        echo json_encode([
            'error' => [
                'root_cause' => [
                    [
                        'type' => 'index_not_found_exception',
                        'reason' => "no such index [{$index}]",
                        'resource.id' => $index,
                        'resource.type' => 'index_or_alias',
                        'index' => $index
                    ]
                ],
                'type' => 'index_not_found_exception',
                'reason' => "no such index [{$index}]",
                'index' => $index
            ],
            'status' => 404
        ]);
        return;
    }
    
    header('Content-Type: application/json');
    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
}

function handle_post_request($path, $body) {
    global $CONFIG;
    
    log_attack('POST_REQUEST', [
        'path' => $path,
        'body_length' => strlen($body),
        'body_preview' => substr($body, 0, 200)
    ]);
    
    if (stripos($body, 'script') !== false || stripos($body, 'eval') !== false || stripos($body, 'painless') !== false) {
        log_attack('RCE_ATTEMPT_POST', ['path' => $path, 'body_snippet' => substr($body, 0, 500)]);
    }
    
    if (preg_match('#/_search|/([a-z0-9_-]+)/_search#', $path)) {
        header('Content-Type: application/json');
        http_response_code(200);
        
        echo json_encode([
            'took' => 78,
            'timed_out' => false,
            '_shards' => ['total' => 5, 'successful' => 5],
            'hits' => [
                'total' => ['value' => 2456, 'relation' => 'eq'],
                'max_score' => null,
                'hits' => []
            ]
        ]);
        return;
    }
    
    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode(['acknowledged' => true]);
}
?>
