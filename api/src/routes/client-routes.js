module.exports = app => {

    const client = require("../controllers/client-controller.js");
    var router = require("express").Router();
  
    router.post("/", client.create);
    router.get("/", client.findAll);  
    router.get("/:id", client.findOne);  
    router.put("/:id", client.update);  
    router.delete("/:id", client.delete);
  
    app.use('/api/clients', router);
};
  