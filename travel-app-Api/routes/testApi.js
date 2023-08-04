const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {
    res.send("A API está funcionando corretamente");
});

module.exports = router;
