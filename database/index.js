const sqlite3 = require('sqlite3').verbose()
const path = require('path');
const csv2json = require('csvtojson');
const config = require('../config');

const CSV_FILE = path.join(__dirname, "../data/students.csv")

let db = new sqlite3.Database(config.database_name, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            FirstName VARCHAR(80),
            LastName VARCHAR(80),
            School VARCHAR(50)
            )`,
        (err) => {
            if (err) {
                // Table already created
            } else {
                csv2json().fromFile(CSV_FILE)
                .then(data => {
                    var insert = 'INSERT INTO students (FirstName, LastName, School) VALUES (?,?,?)';
                    for(const item of data) {
                        db.run(insert, [item.FirstName,item.LastName,item.School]);
                    }
                }).catch(err => {
                    // log error if any
                    console.log(err);
                });
                // Table just created, creating some rows
            }
        });  
    }
});

module.exports = db
