const express = require("express");
const router = express.Router();
const { login, register, current } = require("../controllers/users");

const { auth } = require("../middleware/auth");

/* api/user/login (Путь ) */
router.post("/login", login);
/* api/user/register (Путь ) */
router.post("/register", register);
/* api/user/current (Путь ) */
router.get("/current", auth, current);

module.exports = router;
