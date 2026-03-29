import { DatabaseSync } from "node:sqlite";

const db_path = "./db.sqlite";
const db = new DatabaseSync(db_path);

console.log("Creating database tables");
db.exec(
  `CREATE TABLE IF NOT EXISTS hall (
    id INTEGER PRIMARY KEY,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    author TEXT REFERENCES users(username) ON DELETE NO ACTION
  ) STRICT;
   CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    passhash TEXT,
    created_at INTEGER,
    attributes TEXT DEFAULT NULL
  ) STRICT;`
);

const insert = db.prepare('INSERT INTO hall (fname, lname, author) VALUES (?, ?, ?)');
const update_query = db.prepare('UPDATE hall SET fname = ?, lname = ? WHERE id = ?');
const remove_query = db.prepare('DELETE FROM hall WHERE id = ?;');
const empty = db.prepare('DELETE FROM hall WHERE 1;');
const populate = db.prepare("INSERT INTO hall (fname, lname) VALUES ('Oliwier', 'Bokemon'), ('Antoni', 'Chruściel'), ('Antoni', 'Jacko');");


const addUser = db.prepare('INSERT INTO users (username, passhash, created_at) VALUES (?, ?, ?)');
const checkUser = db.prepare('SELECT id, username, created_at, attributes FROM users WHERE LOWER(username) = ?');
const getHash = db.prepare('SELECT passhash FROM users WHERE username = ?');
const update_attributes = db.prepare('UPDATE users SET attributes = ? WHERE username = ?;');
const get_attributes = db.prepare('SELECT attributes FROM users WHERE username = ?;');

export {
  db,
  insert,
  update_query,
  remove_query,
  empty,
  populate,
  addUser,
  checkUser,
  getHash,
  update_attributes,
  get_attributes
};