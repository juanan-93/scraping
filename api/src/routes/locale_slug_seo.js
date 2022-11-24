module.exports = app => {

    const locale_slug_seo = require("../controllers/locale_slug_seo-controller.js");
    var router = require("express").Router();
  
    router.post("/", locale_slug_seo.create);
    router.get("/", locale_slug_seo.findAll);  
    router.get("/:id", locale_slug_seo.findOne);  
    router.put("/:id", locale_slug_seo.update);  
    router.delete("/:id", locale_slug_seo.delete);
  
    app.use('/api/locale_slug_seo', router);
};
  