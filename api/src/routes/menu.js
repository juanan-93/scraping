module.exports = app => {

    const menu = require("../controllers/menu-controller.js");
    var router = require("express").Router();
  
    router.post("/", menu.create);
    router.get("/", menu.findAll);  
    router.get("/:id", menu.findOne);  
    router.put("/:id", menu.update);  
    router.delete("/:id", menu.delete);
  
    app.use('/api/menus', router);
};
  