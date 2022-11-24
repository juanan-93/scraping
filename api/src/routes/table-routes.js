module.exports = app => {

    const tables = require("../controllers/table-controller.js");
    var router = require("express").Router();
  
    router.post("/", tables.create);
    router.get("/", tables.findAll);  
    router.get("/:id", tables.findOne);  
    router.put("/:id", tables.update);  
    router.delete("/:id", tables.delete);
  
    app.use('/api/tables', router);
};
  