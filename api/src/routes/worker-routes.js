module.exports = app => {

    const worker = require("../controllers/worker-controller.js");
    var router = require("express").Router();
  
    router.post("/", worker.create);
    router.get("/", worker.findAll);  
    router.get("/:id", worker.findOne);  
    router.put("/:id", worker.update);  
    router.delete("/:id", worker.delete);
  
    app.use('/api/workers', router);
};
  