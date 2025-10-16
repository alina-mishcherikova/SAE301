<?php

require_once ('Entity.php');
/**
 * Class Category
 * 
 * Représente un objet Category

 */
class Category extends Entity {
    private int $id;
     private ?string $name = null;

    public function __construct(int $id) {
        $this->id = $id;
    }

 /**
     * Get the value of id
     */
    public function getId(): int {
        return $this->id;
    }
     /**
     * Set the value of id
     */
    public function setId(int $id): void {
         $this->id;
    }


    public function getName(): ?string {
       return $this->name;
     }

  /**
     * Set the value of name
     *
     * @return  self
     */ 
     public function setName(string $name): void {
         $this->name = $name;
     }

         /**
     * Définit comment convertir l'objet Category en JSON
     * 
     * @return mixed Tableau associatif représentant l'objet
     */
    public function jsonSerialize(): mixed {
        return [
            "id" => $this->id,
            "name" => $this->name
        ];
    }

}
