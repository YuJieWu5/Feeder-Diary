const sql = require("./db.js");
// constructor
const Tutorial = function(tutorial) {
  this.date = tutorial.date;
  this.content = tutorial.content;
};

Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

Tutorial.getAll = (date, result) => {
    let query = "SELECT * FROM tutorials";
    if (date) {
      query += ` WHERE date LIKE '%${date}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("tutorials: ", res);
      result(null, res);
    });
  };

  Tutorial.remove = (id, result) => {
    sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted tutorial with id: ", id);
      result(null, res);
    });
  };

  module.exports = Tutorial;