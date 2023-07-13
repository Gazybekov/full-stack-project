const express = require("express");
const router = express.Router();
// {get / }
const {
  all,
  add,
  remove,
  edit,
  employee,
} = require("../controllers/employees");
const { auth } = require("../middleware/auth");

// api/empoyees
router.get("/", auth, all);
//api/empoyees/:id
router.get("/:id", auth, employee);
//api/employees/add
router.post("/add", add);
//api/employees/remove/:id
router.post("/remove/:id", auth, remove);
//api/employees/edit/:id
router.put("/edit/:id", auth, edit);

module.exports = router;
