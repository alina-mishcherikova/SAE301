<?php
require_once("src/Controller/EntityController.php");
require_once("src/Repository/UserRepository.php");

/**
 * Class AuthController
 * 
 * Gère l'authentification des utilisateurs (login/logout)
 * Utilise les sessions PHP pour maintenir l'état d'authentification
 */
class AuthController extends EntityController {
    
    private UserRepository $userRepository;

    public function __construct() {
        $this->userRepository = new UserRepository();
    }

    /**
     * Process POST /api/auth/login
     * 
     * Authentifie un utilisateur avec email et mot de passe
     * Crée une session si les identifiants sont valides
     * 
     * @param HttpRequest $request Requête contenant { email, password }
     * @return array Réponse avec success et message/error
     */
    protected function processPostRequest(HttpRequest $request) {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    $json = $request->getJson();
    $data = json_decode($json);

    if (!isset($data->email) || !isset($data->password)) {
        http_response_code(400);
        return ["success" => false, "error" => "Email et mot de passe requis"];
    }

    $email = trim($data->email);
    $password = $data->password;

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        return ["success" => false, "error" => "Email invalide"];
    }

    $user = $this->userRepository->findByEmail($email);
    if ($user === null) {
        http_response_code(401);
        return ["success" => false, "error" => "Email ou mot de passe incorrect"];
    }

    $passwordHash = $user->getPassword(); 
    if (!password_verify($password, $passwordHash)) {
        http_response_code(401);
        return ["success" => false, "error" => "Email ou mot de passe incorrect"];
    }

    session_regenerate_id(true);
    $_SESSION['authenticated'] = true;
    $_SESSION['user_id'] = $user->getId();
    $_SESSION['email'] = $user->getEmail();
    $_SESSION['firstName'] = $user->getFirstName();
    $_SESSION['secondName'] = $user->getSecondName();

    // Debug: info sur la session et le cookie
    $sessionId = session_id();
    $sessionName = session_name();
    $cookieParams = session_get_cookie_params();
    
    error_log("LOGIN SUCCESS - Session ID: $sessionId");
    error_log("LOGIN SUCCESS - Session Name: $sessionName");
    error_log("LOGIN SUCCESS - Cookie params: " . json_encode($cookieParams));

    header("Content-Type: application/json; charset=utf-8");
    http_response_code(200);
    return [
        "success" => true,
        "message" => "Authentification réussie",
        "user" => [
            "id" => $user->getId(),
            "email" => $user->getEmail(),
            "firstName" => $user->getFirstName(),
            "secondName" => $user->getSecondName()
        ],
        "debug" => [
            "session_id" => $sessionId,
            "session_name" => $sessionName,
            "cookie_params" => $cookieParams
        ]
    ];
}
    /**
     * Process DELETE /api/auth/logout
     * 
     * Déconnecte l'utilisateur et détruit la session
     * 
     * @param HttpRequest $request
     * @return array Réponse avec success et message
     */
    protected function processDeleteRequest(HttpRequest $request) {
        session_start();
        
        // Destruction complète de la session
        $_SESSION = [];
        
        // Suppression du cookie de session
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        
        session_destroy();

        http_response_code(200);
        return [
            "success" => true,
            "message" => "Déconnexion réussie"
        ];
    }

    /**
     * Process GET /api/auth/check
     * 
     * Vérifie si l'utilisateur est actuellement authentifié
     * 
     * @param HttpRequest $request
     * @return array Réponse avec authenticated et user si connecté
     */
    protected function processGetRequest(HttpRequest $request) {
        if(session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        // Debug: log de toutes les infos pertinentes
        $sessionId = session_id();
        $hasCookie = isset($_COOKIE[session_name()]);
        $cookieValue = $_COOKIE[session_name()] ?? 'NONE';
        $hasAuth = isset($_SESSION['authenticated']);
        
        error_log("STATUS CHECK - Session ID: $sessionId");
        error_log("STATUS CHECK - Has Cookie: " . ($hasCookie ? 'YES' : 'NO'));
        error_log("STATUS CHECK - Cookie Value: $cookieValue");
        error_log("STATUS CHECK - Session data: " . json_encode($_SESSION));
        error_log("STATUS CHECK - All Cookies: " . json_encode($_COOKIE));
        
        if(!isset($_SESSION['authenticated'])) {
            http_response_code(401);
            return [
                "authenticated" => false,
                "debug" => [
                    "session_id" => $sessionId,
                    "has_cookie" => $hasCookie,
                    "session_empty" => empty($_SESSION)
                ]
            ];
        }
        
        $user = $this->userRepository->find($_SESSION['user_id']);
        if(!$user){
            http_response_code(401);
            return [
                "authenticated" => false,
            ];
        }
        
        http_response_code(200);
        return [
            "authenticated" => true,
            "user" => [
                "id" => $user->getId(),
                "email" => $user->getEmail(),
                "firstName" => $user->getFirstName(),
                "secondName" => $user->getSecondName()
            ]
        ];
    }
}