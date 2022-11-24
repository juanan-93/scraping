module.exports = app => {

    const orders_details = require("../controllers/order-detail-controller.js");
    var router = require("express").Router();
  
    router.post("/", orders_details.create);
    router.get("/", orders_details.findAll);  
    router.get("/:id", orders_details.findOne);  
    router.put("/:id", orders_details.update);  
    router.delete("/:id", orders_details.delete);
  
    app.use('/api/orders_details', router);
};
  