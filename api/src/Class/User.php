<?php
require_once 'Entity.php';

/**
 * Class User
 * 
 * Représente un objet User
 * 
 * Implémente l'interface JsonSerializable pour permettre la conversion en JSON
 */
class User extends Entity {
    private int $id_user;
    private ?string $email = null;
    private ?string $password= null;
    private ?string $firstName= null;
    private ?string $secondName= null;

    public function __construct(int $id_user=0) {
        $this->id_user = $id_user;
    }

    /**
     * Définit comment convertir l'objet User en JSON
     * 
     * @return mixed Tableau associatif représentant l'objet
     */
    public function jsonSerialize(): mixed {
        return [
            "id_user" => $this->id_user,
            "email" => $this->email,
            "firstName" => $this->firstName,
            "secondName" => $this->secondName,
        ];
    }

    /**
     * Get the value of id
     */
    public function getId(): int {
        return $this->id_user;
    }

    /**
     * Set the value of id
     */
    public function setId(int $id_user): self {
        $this->id_user = $id_user;
        return $this;
    }
    public function getEmail(): ?string {
        return $this->email;
    }
    public function setEmail(?string $email): self {
        $this->email = $email;
        return $this;
    }
    public function getPassword(): ?string {
        return $this->password;
    }
    public function setPassword(?string $password): self {
        $this->password = $password;
        return $this;
    }
    public function getFirstName(): ?string {
        return $this->firstName;
    }
    public function setFirstName(?string $firstName): self {
        $this->firstName = $firstName;
        return $this;
    }
    public function getSecondName(): ?string {
        return $this->secondName;
    }
    public function setSecondName(?string $secondName): self {
        $this->secondName = $secondName;
        return $this;
    }
}
