const { Router } = require("express");
const signUp = require("../controllers/SignUp");
const login = require("../controllers/login");
const auth = require("../controllers/auth");

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/auth", auth);

module.exports = router;
