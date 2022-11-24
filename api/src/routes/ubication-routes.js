module.exports = app => {

    const ubication= require("../controllers/ubication-controller.js");
    var router = require("express").Router();
  
    router.post("/", ubication.create);
    router.get("/", ubication.findAll);  
    router.get("/:id", ubication.findOne);  
    router.put("/:id", ubication.update);  
    router.delete("/:id", ubication.delete);
  
    app.use('/api/ubications', router);
};
  