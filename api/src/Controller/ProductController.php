<?php
require_once "src/Controller/EntityController.php";
require_once "src/Repository/ProductRepository.php" ;


// This class inherits the jsonResponse method  and the $cnx propertye from the parent class Controller
// Only the process????Request methods need to be (re)defined.

class ProductController extends EntityController {

    private ProductRepository $products;

    public function __construct(){
        $this->products = new ProductRepository();
    }

   

protected function processGetRequest(HttpRequest $request) {
    $id = $request->getId();
    $cat = $request->getParam("category");
    
    if ($id) {
        $product = $this->products->find($id);
        
        if (!$product) {
            return null;
        }
        
        // Логування для дебагу
        error_log("Product ID: " . $id);
        error_log("Product category: " . $product->getIdcategory());
        
        if ($product->getIdcategory() == 1) {
            error_log("Returning vinyl details");
            $vinylDetails = $this->products->findVinylWithDetails($id);
            $vinylDetails['gallery'] = $this->products->findGalleryImages($id);
            return $vinylDetails;
        }

        error_log("Returning regular product");
        // Конвертуємо Product об'єкт в масив
        $productData = [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'price' => $product->getPrice(),
            'image' => $product->getImage(),
            'description' => $product->getDescription(),
            'category' => $product->getIdcategory(),
            'gallery' => $this->products->findGalleryImages($id)
        ];
        return $productData;
    }
    else {
        $cat = $request->getParam("category");
        if ($cat == false) {

            return $this->products->findAll();
        }
        else {
           
            return $this->products->findAllByCategory($cat);
        }
    }
}
    protected function processPostRequest(HttpRequest $request) {
        $json = $request->getJson();
        $obj = json_decode($json);
        $p = new Product(0); // 0 is a symbolic and temporary value since the product does not have a real id yet.
        $p->setName($obj->name);
        $p->setIdcategory($obj->category);
        $p->setPrice($obj->price);
        $p->setImage($obj->image);
        $p->setDescription($obj->description);
        $p->setLabel($obj->label);
        $p->setPays($obj->pays);
        $p->setAnnee($obj->annee);
        $p->setGenre($obj->genre);
        $p->setInfosupp($obj->infosupp);
        $p->setLimite($obj->limite);
        $p->setLivraison($obj->livraison);
        $p->setTracklist($obj->tracklist);
        $ok = $this->products->save($p); 
        return $ok ? $p : false;
    }
   
}

