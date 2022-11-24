module.exports = app => {

    const ProductsDistributor = require("../controllers/products-distributor-controller.js");
    var router = require("express").Router();
  
    router.post("/", ProductsDistributor.create);
    router.get("/", ProductsDistributor.findAll);  
    router.get("/:id", ProductsDistributor.findOne);  
    router.put("/:id", ProductsDistributor.update);  
    router.delete("/:id", ProductsDistributor.delete);
  
    app.use('/api/ProductsDistributors', router);
};
  