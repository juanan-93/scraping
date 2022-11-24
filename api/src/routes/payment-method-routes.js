module.exports = app => {

    const paymentmethod = require("../controllers/payment-method-controller.js");
    var router = require("express").Router();
  
    router.post("/", paymentmethod.create);
    router.get("/", paymentmethod.findAll);  
    router.get("/:id", paymentmethod.findOne);  
    router.put("/:id", paymentmethod.update);  
    router.delete("/:id", paymentmethod.delete);
  
    app.use('/api/payment-method', router);
};
  