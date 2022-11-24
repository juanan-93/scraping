module.exports = app => {

    const recipes = require("../controllers/recipe-controller.js");
    var router = require("express").Router();
  
    router.post("/", recipes.create);
    router.get("/", recipes.findAll);  
    router.get("/:id", recipes.findOne);  
    router.put("/:id", recipes.update);  
    router.delete("/:id", recipes.delete);
  
    app.use('/api/recipes', router);
};
  