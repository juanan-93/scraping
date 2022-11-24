module.exports = app => {

    const locale_seo = require("../controllers/locale_seo-controller.js");
    var router = require("express").Router();
  
    router.post("/", locale_seo.create);
    router.get("/", locale_seo.findAll);  
    router.get("/:id", locale_seo.findOne);  
    router.put("/:id", locale_seo.update);  
    router.delete("/:id", locale_seo.delete);
  
    app.use('/api/locale_seo', router);
};
  