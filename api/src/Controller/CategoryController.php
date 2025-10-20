<?php
require_once "src/Controller/EntityController.php";
require_once 'src/Repository/CategoryRepository.php';

/**
 * Classe CategoryController
 * 
 * Gère les requêtes HTTP concernant l'entité Category
 * Hérite de Controller pour bénéficier de la méthode jsonResponse()
 */
class CategoryController extends EntityController {

    private CategoryRepository $categories;

    public function __construct() {
        $this->categories = new CategoryRepository();
    }

    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getId();
        
        if ($id) {
            // GET /api/{strtolower(Category)}s/{id}
           $categoryName = $this->categories->findCategoryName($id);
        if ($categoryName) {
            return ['name' => $categoryName];
        }
        
              return $this->categories->findAll();}
        // } else {

        //     $name = $request->getParam("name");
        //  if ($name) {
        //        return $this->categories->findAllByCategory($name);
        //     }}
            
            return $this->categories->findAll();
        }
    

    
    protected function processPostRequest(HttpRequest $request) {

        $json = $request->getJson();
        $obj = json_decode($json);
        
        $c = new Category(0);
        $c->setName($obj->name);   
        $ok = $this->categories->save($c);
        return $ok ? $c : false;
      
    }
}
?>