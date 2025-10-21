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
    private ?string $artist = null;
    private ?string $label = null;
    private ?string $country = null;
    private ?int $year = null;
    private ?string $genre = null;
    private ?string $etat = null;
    private ?string $special = null;

    private ?array $gallery = [];

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
            "description"=> $this -> description,
            "artist"=> $this -> artist,
            "label"=> $this -> label,
            "country"=> $this -> country,
            "year" => $this -> year,
            "genre" => $this -> genre,
            "etat"=> $this -> etat,
            "special"=> $this -> special,
            "gallery"=> $this -> gallery
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
    public function setName(?string $name): self
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
    public function setIdcategory(?int $idcategory): self
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
    public function setPrice(?float $price): self
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
    public function setImage(?string $image): self
    {
        $this->image = $image;
        return $this;
    }
        public function getDescription(): ?string
    {
        return $this->description;
    }

        public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getArtist(): ?string
    {
        return $this->artist;
    }
    public function setArtist(?string $artist): self
    {
        $this->artist = $artist;
        return $this;
    }
    public function getLabel(): ?string
    {
        return $this->label;
    }
    public function setLabel(?string $label): self
    {
        $this->label = $label;
        return $this;
    }
    public function getCountry(): ?string
    {
        return $this->country;
    }
    public function setCountry(?string $country): self
    {
        $this->country = $country;
        return $this;
    }
    public function getYear(): ?int
    {
        return $this->year;
    }
    public function setYear(?int $year): self
    {
        $this->year = $year;
        return $this;
    }
    public function getGenre(): ?string
    {
        return $this->genre;
    }
    public function setGenre(?string $genre): self
    {
        $this->genre = $genre;
        return $this;
    }
    public function getEtat(): ?string
    {
        return $this->etat;
    }
    public function setEtat(?string $etat): self
    {
        $this->etat = $etat;
        return $this;
    }
    public function getSpecial(): ?string
    {
        return $this->special;
    }
    public function setSpecial(?string $special): self
    {
        $this->special = $special;
        return $this;
    }
    public function getGallery(): ?array
    {
        return $this->gallery;
    }
    public function addGallery($image): self
    {
        $this-> gallery[] = $image;
        return $this;
    }

}