module.exports = app => {

    const ProductCategory = require("../controllers/product-category-controller.js");
    var router = require("express").Router();
  
    router.post("/", ProductCategory.create);
    router.get("/", ProductCategory.findAll);  
    router.get("/:id", ProductCategory.findOne);  
    router.put("/:id", ProductCategory.update);  
    router.delete("/:id", ProductCategory.delete);
  
    app.use('/api/ProductsCategory', router);
};
  