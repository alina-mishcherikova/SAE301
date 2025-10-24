<?php
require_once "src/Controller/EntityController.php";
require_once "src/Repository/UserRepository.php";

/**
 * Classe UserController
 * 
 * Gère les requêtes HTTP concernant l'entité User
 * Hérite de Controller pour bénéficier de la méthode jsonResponse()
 */
class UserController extends EntityController {

    private UserRepository $users;

    public function __construct() {
        $this->users = new UserRepository();
    }

    /**
     * Traite les requêtes GET
     * 
     * GET /api/{strtolower(User)}s        → Récupère tous les Users
     * GET /api/{strtolower(User)}s/{id}   → Récupère un User spécifique
     * 
     * @param HttpRequest $request
     * @return mixed Données à convertir en JSON, ou false en cas d'erreur
     */
    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId();
        
        if ($id) {
            // GET /api/{strtolower(User)}s/{id}
            $user = $this->users->find($id);
            return $user;
        } else {
            // GET /api/{strtolower(User)}s
            // TODO: Gérer les paramètres de filtrage si nécessaire
            // Exemple :
            // $category = $request->getParam("category");
            // if ($category) {
            //     return $this->repository->findAllByCategory($category);
            // }
            
            return $this->users->findAll();
        }
    }

    /**
     * Traite les requêtes POST
     * 
     * POST /api/{strtolower(User)}s       → Crée un nouveau User
     * 
     * @param HttpRequest $request
     * @return mixed Le User créé avec son ID, ou false en cas d'erreur
     */
    protected function processPostRequest(HttpRequest $request) {
        $json = $request->getJson();
        $obj = json_decode($json);
 

        //login
        $loginUser=isset($_GET['login']);
        if($loginUser){
            if(!isset($obj->email) || !isset($obj->password)){
                return false;
            }
            $user = $this->users->findByEmail($obj->email);
            if($user && password_verify($obj->password, $user->getPassword())){
                return $user;
            }
        }
        else{
            //creation
            $user=new User();
            $user->setEmail($obj->email);
            $hashedPassword = password_hash($obj->password, PASSWORD_DEFAULT);
            $user->setPassword($hashedPassword);
            $user->setFirstName($obj->firstName);
            $user->setSecondName($obj->secondName);
            $newUser = $this->users->save($user);
            return $newUser;
        }
    }

    /**
     * Traite les requêtes DELETE
     * 
     * DELETE /api/{strtolower(User)}s/{id} → Supprime un User
     * 
     * @param HttpRequest $request
     * @return mixed true si supprimé, false sinon
     */
    protected function processDeleteRequest(HttpRequest $request) {
        // TODO: Implémenter la suppression
        // Exemple :
        /*
        $id = $request->getId();
        
        if (!$id) {
            return false;
        }
        
        return $this->repository->delete($id);
        */
        
        return false; // À remplacer par votre implémentation
    }

    /**
     * Traite les requêtes PATCH
     * 
     * PATCH /api/{strtolower(User)}s/{id}  → Met à jour un User
     * 
     * @param HttpRequest $request
     * @return mixed Le User modifié, ou false en cas d'erreur
     */
    protected function processPatchRequest(HttpRequest $request) {
        // Vérifier si l'utilisateur est authentifié
        if (!$this->isAuthenticated()) {
            http_response_code(401);
            return false;
        }

        $id = $request->getId();
        
        if (!$id) {
            return false;
        }

        // Vérifier que l'utilisateur ne peut modifier que son propre profil
        $currentUserId = $this->getCurrentUserId();
        if ($currentUserId != $id) {
            http_response_code(403); // Forbidden
            return false;
        }
        
        $entity = $this->users->find($id);
        if (!$entity) {
            return false;
        }
        
        $json = $request->getJson();
        $obj = json_decode($json);
        
        // Mise à jour des propriétés (uniquement celles fournies)
        if (isset($obj->firstName)) {
            $entity->setFirstName($obj->firstName);
        }
        
        if (isset($obj->secondName)) {
            $entity->setSecondName($obj->secondName);
        }
        
        if (isset($obj->email)) {
            $entity->setEmail($obj->email);
        }
        
        // Si un nouveau mot de passe est fourni, le hasher
        if (isset($obj->password) && !empty($obj->password)) {
            $hashedPassword = password_hash($obj->password, PASSWORD_DEFAULT);
            $entity->setPassword($hashedPassword);
        }
        
        $ok = $this->users->update($entity);
        return $ok ? $entity : false;
    }

    /**
     * Traite les requêtes PUT
     * 
     * PUT /api/{strtolower(User)}s/{id}    → Remplace complètement un User
     * 
     * @param HttpRequest $request
     * @return mixed Le User remplacé, ou false en cas d'erreur
     */
    protected function processPutRequest(HttpRequest $request) {
        // TODO: Implémenter le remplacement complet (optionnel)
        // Note : PATCH est généralement préféré à PUT
        return false;
    }
}
