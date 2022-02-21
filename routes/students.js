const express = require("express");
const router = express.Router();

const db = require("../database");

router.get("/students", (req, res, next) => {
    var sql = "select * from students"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
}); 

router.get("/chart", (req, res, next) => {
    sql = "SELECT School as school, COUNT(*) as count";
    sql += " FROM students GROUP BY School";

    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows)
      });
});

module.exports = router;

