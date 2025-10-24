# Guide d'implémentation de l'authentification par SESSION

## Vue d'ensemble

Ce guide vous explique comment implémenter un système d'authentification basé sur les **sessions PHP** dans le projet SAE301. L'authentification par session utilise les cookies de session côté client et les variables de session côté serveur.

### Pourquoi les sessions ?

- ✅ **Simple** : Mécanisme natif de PHP
- ✅ **Sécurisé** : Le mot de passe n'est jamais stocké en clair
- ✅ **Stateful** : Le serveur mémorise l'état d'authentification
- ✅ **Adapté** : Parfait pour les applications web traditionnelles

---

## Architecture Backend (API)

### Flux d'authentification complet

```
┌────────────────────────────────────────────────────────────────┐
│                         AUTHENTIFICATION                       │
└────────────────────────────────────────────────────────────────┘

1. Client envoie POST /api/auth/login
   Body: { "email": "user@example.com", "password": "secret" }
   
2. .htaccess redirige vers index.php
   
3. index.php route vers AuthController
   
4. AuthController::processPostRequest()
   ├─ Récupère email et password du JSON
   ├─ UserRepository::findByEmail(email) (ou équivalent)
   ├─ Vérifie password_verify(password, user->password_hash)
   │  
   ├─ Si OK :
   │  ├─ session_start()
   │  ├─ $_SESSION['authenticated'] = true
   │  ├─ $_SESSION['user_id'] = user->id (optionnel mais recommandé)
   │  └─ Retourne { "success": true, "user": {...} }
   │  
   └─ Si KO :
      └─ Retourne { "success": false, "error": "..." }

5. Client reçoit la réponse + Cookie de session si OK (automatique)

┌────────────────────────────────────────────────────────────────┐
│                    REQUÊTES AUTHENTIFIÉES                      │
└────────────────────────────────────────────────────────────────┘
Exemple factice : on imagine que les produits sont protégés.
Seuls les utilisateurs authentifiés peuvent y accéder.


1. Client envoie GET /api/products (+ Cookie de session)
   
2. ProductController::processGetRequest()
   ├─ session_start()  // Restaure $_SESSION
   │  
   ├─ Vérifier si $_SESSION['authenticated'] == true
   │  
   ├─ Si OUI : traiter la requête normalement
   │  
   └─ Si NON : 
      └─ return { "error": "Unauthorized" }
```

---

## Étape 1 : Créer AuthController

### Fichier : `src/Controller/AuthController.php`

```php
<?php

require_once "Controller.php";
require_once "../Repository/UserRepository.php";

/**
 * Contrôleur gérant l'authentification
 * 
 * "auth" est une ressource "virtuelle" (pas de table Auth en BDD)
 * mais elle suit la même architecture que les autres contrôleurs
 */
class AuthController extends Controller {
    
    private UserRepository $userRepository;
    
    public function __construct() {
        $this->userRepository = new UserRepository();
    }
    
    /**
     * Traite les requêtes POST sur /api/auth/login
     * 
     * Conceptuellement, une requête POST crée une ressource.
     * Ici, on "crée" une session authentifiée.
     */
    protected function processPostRequest(HttpRequest $request) {
        // Récupérer le JSON envoyé par le client
        $json = $request->getJson();
        $data = json_decode($json);
        
        // Validation basique
        // Dans cet exemple, les noms des données transmises sont email et password
        if (!isset($data->email) || !isset($data->password)) {
            // Bad Request
            return [
                "success" => false,
                "error" => "Email et mot de passe requis"
            ];
        }
        
        $email = $data->email;
        $password = $data->password;
        
        // Chercher l'utilisateur par email
        $user = $this->userRepository->findByEmail($email);
        
        if ($user === null) {
            // Utilisateur non trouvé
            return [
                "success" => false,
                "error" => "Aucun compte trouvé pour cet email"
            ];
        }
        
        // Vérifier le mot de passe avec password_verify()
        // Compare le password en clair avec le hash en BDD
        if (!password_verify($password, $user->getPasswordHash())) {
            // Mot de passe incorrect
            return [
                "success" => false,
                "error" => "Email ou mot de passe incorrect"
            ];
        }
        
        // ✅ Authentification réussie !
        
        // Démarrer une session (ou restaurer une session existante)
        session_start();
        
        // Enregistrer des informations dans la session
        $_SESSION['authenticated'] = true;
        $_SESSION['user_id'] = $user->getId();
        $_SESSION['email'] = $user->getEmail();
        
        // Régénérer l'ID de session pour plus de sécurité
        session_regenerate_id(true);
        
        // Retourner une réponse de succès
        return [
            "success" => true,
            "message" => "Authentification réussie"
        ];
    }
    
   
}
```

---

## Étape 2 : Enregistrer AuthController dans le routeur

### Fichier : `index.php` (modification)

```php
<?php
require_once "src/Controller/ProductController.php";
require_once "src/Controller/AuthController.php";  // ← Ajouter
require_once "src/Class/HttpRequest.php";

$router = [
    "products" => new ProductController(),
    "auth" => new AuthController()  // ← Ajouter
];

// ... reste du code inchangé
```

**Maintenant, l'URI `/api/auth/login` est fonctionnelle !**

---

## Optionnel : Modifier la classe abstraite Controller

###  Ajout d'une méthode isAuthenticated 

Ajouter une méthode helper dans `Controller.php`  afin de vérifier si l'utilisateur est authentifié. Comme tous les contrôleurs héritent de `Controller`, cette méthode sera disponible partout. On pourra s'en servir pour protéger les routes sensibles.

```php
<?php
abstract class Controller {
    
    // ... méthodes existantes ...
    
    /**
     * Vérifie si l'utilisateur est authentifié
     * 
     * @return bool true si authentifié, false sinon
     */
    protected function isAuthenticated(): bool {
        session_start();
        return isset($_SESSION['authenticated']) && $_SESSION['authenticated'] === true;
    }
    
   
}
```

---

## Architecture Frontend (Client)

### Flux d'authentification côté client

```
┌────────────────────────────────────────────────────────────────┐
│                         PAGE DE LOGIN                          │
└────────────────────────────────────────────────────────────────┘

1. Utilisateur remplit le formulaire (email, password)

2. JavaScript intercepte la soumission du formulaire

3. fetch('http://localhost/api/auth/login', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     credentials: 'include',  // ← CRUCIAL pour RECEVOIR le cookie de session
                              //   Sans cela, le navigateur IGNORE le Set-Cookie !
     body: JSON.stringify({ email, password })
   })

4. Serveur répond avec JSON + Cookie de session (Set-Cookie)

5. Si success === true :
   ├─ router.setAuth(true)  // Le router mémorise l'authentification
   └─ router.navigate('/dashboard')  // Redirection

6. Si success === false :
   └─ Afficher un message d'erreur


┌────────────────────────────────────────────────────────────────┐
│                    REQUÊTES AUTHENTIFIÉES                      │
└────────────────────────────────────────────────────────────────┘

Toutes les requêtes fetch doivent inclure : credentials: 'include'

fetch('http://localhost/api/products', {
  method: 'GET',
  credentials: 'include'  // ← Le cookie de session sera envoyé
})

Sans credentials: 'include', le cookie n'est PAS envoyé !
```

---
