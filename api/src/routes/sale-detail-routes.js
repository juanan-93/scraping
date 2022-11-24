module.exports = app => {

    const salesDetail = require("../controllers/sale-detail-controller.js");
    var router = require("express").Router();
  
    router.post("/", salesDetail.create);
    router.get("/", salesDetail.findAll);  
    router.get("/:id", salesDetail.findOne);  
    router.put("/:id", salesDetail.update);  
    router.delete("/:id", salesDetail.delete);
  
    app.use('/api/salesDetails', router);
};
  