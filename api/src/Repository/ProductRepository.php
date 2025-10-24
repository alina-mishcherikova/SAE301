<?php

require_once("src/Repository/EntityRepository.php");
require_once("src/Class/Product.php");


/**
 *  Classe ProductRepository
 * 
 *  Cette classe représente le "stock" de Product.
 *  Toutes les opérations sur les Product doivent se faire via cette classe 
 *  qui tient "synchro" la bdd en conséquence.
 * 
 *  La classe hérite de EntityRepository ce qui oblige à définir les méthodes  (find, findAll ... )
 *  Mais il est tout à fait possible d'ajouter des méthodes supplémentaires si
 *  c'est utile !
 *  
 */
class ProductRepository extends EntityRepository {

    public function __construct(){
        // appel au constructeur de la classe mère (va ouvrir la connexion à la bdd)
        parent::__construct();
    }

    public function find($id): ?Product{
        /*
            La façon de faire une requête SQL ci-dessous est "meilleur" que celle vue
            au précédent semestre (cnx->query). Notamment l'utilisation de bindParam
            permet de vérifier que la valeur transmise est "safe" et de se prémunir
            d'injection SQL.
        */
        $requete = $this->cnx->prepare("select * from Product where id=:value"); // prepare la requête SQL
        $requete->bindParam(':value', $id); // fait le lien entre le "tag" :value et la valeur de $id
        $requete->execute(); // execute la requête
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        
        if ($answer==false) return null; // may be false if the sql request failed (wrong $id value for example)
        
        $p = new Product($answer->id);
        $p->setName($answer->name ?? null);
        $p->setIdcategory($answer->category ?? null);
        $p->setPrice($answer->price ?? null);
        $p->setImage($answer->image ?? null);
        $p->setDescription($answer->description ?? null);
        $p->setArtist($answer->artist ?? null);
        $p->setLabel($answer->label ?? null);
        $p->setCountry($answer->country ?? null);
        $p->setYear($answer->year ?? null);
        $p->setGenre($answer->genre ?? null);
        $p->setEtat($answer->etat ?? null);
        $p->setSpecial($answer->special ?? null);

        $requete = $this->cnx->prepare("select image from Gallery where id_product=:value"); 
        $id_product = $p->getId();
        $requete->bindParam(':value',$id_product);
        $requete->execute();
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        while ($answer !=null){
            $image = $answer->image;
            $p->addGallery($image);
            $answer = $requete->fetch(PDO::FETCH_OBJ);
        }


        return $p;
    }

    public function findAll(): array {
        $requete = $this->cnx->prepare("select * from Product");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
        foreach($answer as $obj){
            $p = new Product($obj->id);
            $p->setName($obj->name);
            $p->setIdcategory($obj->category );
            $p->setPrice($obj->price );
            $p->setImage($obj->image);
            $p->setDescription($obj->description );
            $p->setArtist($obj->artist);
            $p->setLabel($obj->label);
            $p->setCountry($obj->country );
            $p->setYear($obj->year);
            $p->setGenre($obj->genre );
            $p->setEtat($obj->etat);
            $p->setSpecial($obj->special ?? null);

            $requete = $this->cnx->prepare("select * from Gallery where id_product=:value"); 
            $id_product = $p->getId();
            $requete->bindParam(':value',$id_product); 
            $requete->execute();
            $answer = $requete->fetch(PDO::FETCH_OBJ);
            while ($answer !=null){
                $image = $answer->image;
                $p->addGallery($image);
                $answer = $requete->fetch(PDO::FETCH_OBJ);
        }

            array_push($res, $p);
        }
       
        return $res;
    }

public function findAllByCategory($categoryId): array {
        $requete = $this->cnx->prepare("select * from Product where category=:categoryId");
        $requete->bindParam(':categoryId', $categoryId);
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $res = [];
 foreach($answer as $obj){
            $p = new Product($obj->id);
            $p->setName($obj->name ?? null);
            $p->setIdcategory($obj->category ?? null);
            $p->setPrice($obj->price ?? null);
            $p->setImage($obj->image ?? null);
            $p->setDescription($obj->description ?? null);
            $p->setArtist($obj->artist ?? null);
            $p->setLabel($obj->label ?? null);
            $p->setCountry($obj->country ?? null);
            $p->setYear($obj->year ?? null);
            $p->setGenre($obj->genre ?? null);
            $p->setEtat($obj->etat ?? null);
            $p->setSpecial($obj->special ?? null);
            array_push($res, $p);
        }
       
        return $res;
    }


public function save($product){
        $requete = $this->cnx->prepare("insert into Product (name, category) values (:name, :idcategory)");
        $name = $product->getName();
        $idcat = $product->getIdcategory();
        $requete->bindParam(':name', $name );
        $requete->bindParam(':idcategory', $idcat);
        $answer = $requete->execute(); // an insert query returns true or false. $answer is a boolean.

        if ($answer){
            $id = $this->cnx->lastInsertId(); // retrieve the id of the last insert query
            $product->setId($id); // set the product id to its real value.
            return true;
        }
          
        return false;
    }

    public function delete($id){
        // Not implemented ! TODO when needed !
        return false;
    }

    public function update($product){
        // Not implemented ! TODO when needed !
        return false;
    }

   
    
}