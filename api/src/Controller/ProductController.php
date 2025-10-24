<?php
require_once "src/Controller/EntityController.php";
require_once "src/Repository/ProductRepository.php";

// This class inherits the jsonResponse method  and the $cnx propertye from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class ProductController extends EntityController
{

    private ProductRepository $products;

    public function __construct()
    {
        $this->products = new ProductRepository();
    }

    protected function processGetRequest(HttpRequest $request)
    {
        $id  = $request->getId();
        $cat = $request->getParam
            ("category");
        if ($id) {
            return $this->products->find($id);
        } else {
            $cat = $request->getParam("category");
            if ($cat == false)                    
            {
                return $this->products->findAll();
            } else // return only products of category $cat
            {
                return $this->products->findAllByCategory($cat);
            }

        }
    }

    protected function processPostRequest(HttpRequest $request)
    {
        $json = $request->getJson();
        $obj= json_decode($json);
        $p= new Product(0);
        $p->setName($obj->name);
        $p->setIdcategory($obj->category);
        $p->setPrice($obj->price);
        $p->setImage($obj->image);
        $p->setDescription($obj->description);
        $p->setArtist($obj->artist);
        $p->setLabel($obj->label);
        $p->setCountry($obj->country);
        $p->setYear($obj->year);
        $p->setGenre($obj->genre);
        $p->setEtat($obj->etat);
        $p->setSpecial($obj->special);
        $ok = $this->products->save($p);
        return $ok ? $p : false;
    }

}
