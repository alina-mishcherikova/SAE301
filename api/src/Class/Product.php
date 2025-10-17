<?php

require_once ('Entity.php');

/**
 *  Class Product
 * 
 *  Représente un produit avec uniquement 3 propriétés (id, name, category)
 * 
 *  Implémente l'interface JsonSerializable 
 *  qui oblige à définir une méthode jsonSerialize. Cette méthode permet de dire comment les objets
 *  de la classe Product doivent être converti en JSON. Voire la méthode pour plus de détails.
 */
class Product extends Entity {
    private int $id; // id du produit
    private ?string $name = null; // nom du produit (nullable pour éviter erreur si non initialisé)
    private ?int $idcategory = null; // id de la catégorie du produit (nullable)
    private ?float $price = null;
    private ?string $image = null;
    private ?string $description = null;
    private ?string $label = null;
    private ?string $pays = null; 
    private ?string $annee = null;
    private ?string $genre = null;
    private ?string $infosupp = null;
    private ?string $limite = null;
    private ?string $livraison = null;
    private ?string $tracklist = null;

    public function __construct(int $id){
        $this->id = $id;
    }

    /**
     * Get the value of id
     */ 
    public function getId(): int
    {
        return $this->id;
    }

    /**
     *  Define how to convert/serialize a Product to a JSON format
     *  This method will be automatically invoked by json_encode when apply to a Product
     * 
     *  En français : On sait qu'on aura besoin de convertir des Product en JSON pour les
     *  envoyer au client. La fonction json_encode sait comment convertir en JSON des données
     *  de type élémentaire. A savoir : des chaînes de caractères, des nombres, des booléens
     *  des tableaux ou des objets standards (stdClass). 
     *  Mais json_encode ne saura pas convertir un objet de type Product dont les propriétés sont
     *  privées de surcroit. Sauf si on définit la méthode JsonSerialize qui doit retourner une
     *  représentation d'un Product dans un format que json_encode sait convertir (ici un tableau associatif)
     * 
     *  Le fait que Product "implémente" l'interface JsonSerializable oblige à définir la méthode
     *  JsonSerialize et permet à json_encode de savoir comment convertir un Product en JSON.
     * 
     *  Parenthèse sur les "interfaces" : Une interface est une classe (abstraite en générale) qui
     *  regroupe un ensemble de méthodes. On dit que "une classe implémente une interface" au lieu de dire 
     *  que "une classe hérite d'une autre" uniquement parce qu'il n'y a pas de propriétés dans une "classe interface".
     * 
     *  Voir aussi : https://www.php.net/manual/en/class.jsonserializable.php
     *  
     */
    // Implémentation correcte de JsonSerializable : méthode nommée jsonSerialize()
    public function jsonSerialize(): mixed{
        return [
            "id" => $this->id,
            "name" => $this->name,
            "category" => $this->idcategory,
            "price" => $this->price,
            "image"=> $this -> image,
            "description" => $this->description,
            "label"=>$this->label,
            "pays"=>$this->pays,
            "annee"=>$this->annee,
            "genre"=>$this->genre,
            "infosupp"=>$this->infosupp,
            "limite"=>$this->limite,
            "livraison"=>$this->livraison,
            "tracklist"=>$this->tracklist
        ];
    }

    /**
     * Get the value of name
     */ 
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */ 
    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Get the value of idcategory
     */ 
    public function getIdcategory(): ?int
    {
        return $this->idcategory;
    }

    /**
     * Set the value of idcategory
     *
     * @return  self
     */ 
    public function setIdcategory(int $idcategory): self
    {
        $this->idcategory = $idcategory;
        return $this;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }
        /**
     * Get the value of price
     */ 
    public function getPrice(): ?float
    {
        return $this->price;
    }

        /**
     * Set the value of price
     *
     * @return  self
     */ 
    public function setPrice(float $price): self
    {
        $this->price = $price;
        return $this;
    }

            /**
     * Get the value of image
     */ 
    public function getImage(): ?string
    {
        return $this->image;
    }

        /**
     * Set the value of image
     *
     * @return  self
     */ 
    public function setImage(string $image): self
    {
        $this->image = $image;
        return $this;
    }
        public function getDescription(): ?string
    {
        return $this->description;
    }

        /**
     * Set the value of description
     *
     * @return  self
     */ 
    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }
    public function getLabel(): ?string
    {
        return $this->label;
    }
    public function setLabel(string $label): self
    {
        $this->label = $label;
        return $this;
    }

    public function getPays(): ?string
    {
        return $this->pays;
    }
    public function setPays(string $pays): self
    {
        $this->pays = $pays;
        return $this;
    }
    public function getAnnee(): ?string
    {
        return $this->annee;
    }
    public function setAnnee(string $annee): self
    {
        $this->annee = $annee;
        return $this;
    }
    public function getGenre(): ?string
    {
        return $this->genre;
    }
    public function setGenre(string $genre): self
    {
        $this->genre = $genre;
        return $this;
    }
    public function getInfosupp(): ?string
    {
        return $this->infosupp;
    }
    public function setInfosupp(string $infosupp): self
    {
        $this->infosupp = $infosupp;
        return $this;
    }
    public function getLimite(): ?string
    {
        return $this->limite;
    }
    public function setLimite(string $limite): self
    {
        $this->limite = $limite;
        return $this;
    }
    public function getLivraison(): ?string
    {
        return $this->livraison;
    }
    public function setLivraison(string $livraison): self
    {
        $this->livraison = $livraison;
        return $this;
    }
    public function getTracklist(): ?string
    {
        return $this->tracklist;
    }
    public function setTracklist(string $tracklist): self
    {
        $this->tracklist = $tracklist;
        return $this;
    }
}