const path = require('path');
const sqlite3 = require('sqlite3').verbose()

const databasePath = path.join(__dirname, 'db.sqlite')
const db = new sqlite3.Database(databasePath)

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS users');
  db.run('CREATE TABLE users (username TEXT PRIMARY KEY)');
})

module.exports = db