module.exports = app => {

    const price = require("../controllers/price-controller.js");
    var router = require("express").Router();
  
    router.post("/", price.create);
    router.get("/", price.findAll);  
    router.get("/:id", price.findOne);  
    router.put("/:id", price.update);  
    router.delete("/:id", price.delete);
  
    app.use('/api/prices', router);
};
  