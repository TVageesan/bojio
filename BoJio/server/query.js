const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db',sqlite3.OPEN_READWRITE);

export const addUser = (name) => {
  db.run("INSERT INTO USER (GROUP_ID,NAME) VALUES (0," + name + ",)");
}




