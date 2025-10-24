<?php
require_once("src/Repository/EntityRepository.php");
require_once("src/Class/User.php");

/**
 * Classe UserRepository
 * 
 * Gère l'accès aux données de l'entité User
 * Toutes les opérations CRUD doivent passer par cette classe
 */
class UserRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }

    /**
     * Récupère un User par son ID
     * 
     * @param mixed $id L'identifiant du User
     * @return ?User L'objet User ou null si non trouvé
     */
    public function find($id_user): ?User {
        
        $requete = $this->cnx->prepare("SELECT * FROM Users WHERE id_user=:value");
        $requete->bindParam(':value', $id_user);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        
        if ($answer == false) return null;

        $u = new User($answer->id_user);
        $u->setEmail($answer->email);
        $u->setPassword($answer->password);
        $u->setFirstName($answer->firstName);
        $u->setSecondName($answer->secondName);

        return $u;

    }

    /**
     * Récupère tous les Users
     * 
     * @return array Tableau d'objets User
     */
    public function findAll(): array {
        $requete = $this->cnx->prepare("SELECT * FROM Users");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach ($answer as $obj) {
            $u = new User($obj->id_user);
            $u->setEmail($obj->email);
            $u->setPassword($obj->password);
            $u->setFirstName($obj->firstName);
            $u->setSecondName($obj->secondName);
            $res[] = $u;
        }
        
        return $res;
    }

        public function findByEmail($email): ?User {
        
        $requete = $this->cnx->prepare("SELECT * FROM Users WHERE email=:value");
        $requete->bindParam(':value', $email);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        
        if ($answer == false) return null;

        $u = new User($answer->id_user);
        $u->setEmail($answer->email);
        $u->setPassword($answer->password);
        $u->setFirstName($answer->firstName);
        $u->setSecondName($answer->secondName);

        return $u;

    }

    /**
     * Sauvegarde un nouveau User dans la base de données
     * 
     * @param mixed $entity L'objet User à sauvegarder
     * @return User|false L'objet User avec son ID si succès, false sinon
     */
    public function save($entity) {
        $requete = $this->cnx->prepare(
            "INSERT INTO Users (email, password, firstName, secondName) VALUES (:email, :password, :firstName, :secondName)"
        );
        $email = $entity->getEmail();
        $password = $entity->getPassword();
        $firstName = $entity->getFirstName();
        $secondName = $entity->getSecondName();

        $requete->bindParam(':firstName', $firstName);
        $requete->bindParam(':secondName', $secondName);
        $requete->bindParam(':email', $email); 
        $requete->bindParam(':password', $password);

        $answer = $requete->execute();

        if ($answer) {
            $id = $this->cnx->lastInsertId();
            $entity->setId((int)$id);
            return $entity;
        }
        
        return false;

    }

    /**
     * Supprime un User de la base de données
     * 
     * @param mixed $id L'identifiant du User à supprimer
     * @return bool true si succès, false sinon
     */
    public function delete($id): bool {
        // TODO: Implémenter la requête DELETE
        // Exemple :
        /*
        $requete = $this->cnx->prepare("DELETE FROM User WHERE id=:value");
        $requete->bindParam(':value', $id);
        return $requete->execute();
        */
        
        return false; // À remplacer par votre implémentation
    }

    /**
     * Met à jour un User existant dans la base de données
     * 
     * @param mixed $entity L'objet User à mettre à jour
     * @return bool true si succès, false sinon
     */
    public function update($entity): bool {
        $requete = $this->cnx->prepare(
            "UPDATE Users SET email=:email, password=:password, firstName=:firstName, secondName=:secondName WHERE id_user=:id"
        );
        $id = $entity->getId();
        $email = $entity->getEmail();
        $password = $entity->getPassword();
        $firstName = $entity->getFirstName();
        $secondName = $entity->getSecondName();
        
        $requete->bindParam(':id', $id);
        $requete->bindParam(':email', $email);
        $requete->bindParam(':password', $password);
        $requete->bindParam(':firstName', $firstName);
        $requete->bindParam(':secondName', $secondName);
        
        return $requete->execute();
    }

    // TODO: Ajouter vos méthodes de recherche personnalisées ici
    // Exemple :
    //
    // public function findAllByCategory($categoryId): array {
    //     $requete = $this->cnx->prepare("SELECT * FROM User WHERE category_id=:cat");
    //     $requete->bindParam(':cat', $categoryId);
    //     $requete->execute();
    //     // ...
    // }
}
