module.exports = app => {

    const  menuItems= require("../controllers/menu_items-controller.js");
    var router = require("express").Router();
  
    router.post("/", menuItems.create);
    router.get("/", menuItems.findAll);  
    router.get("/:id", menuItems.findOne);  
    router.put("/:id", menuItems.update);  
    router.delete("/:id", menuItems.delete);
  
    app.use('/api/menuItems', router);
};
  