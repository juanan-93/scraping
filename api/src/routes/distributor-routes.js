module.exports = app => {

    const distributor = require("../controllers/distributor-controller.js");
    var router = require("express").Router();
  
    router.post("/", distributor.create);
    router.get("/", distributor.findAll);  
    router.get("/:id", distributor.findOne);  
    router.put("/:id", distributor.update);  
    router.delete("/:id", distributor.delete);
  
    app.use('/api/distributors', router);
};
  