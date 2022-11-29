
module.exports = app => {

    const auth = require("../controllers/auth/worker-auth-controller.js");

    app.use(function(req, res, next) {

        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post("/api/auth/workers/signin", auth.signin);
};