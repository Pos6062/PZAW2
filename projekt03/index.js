import { name } from "ejs";
import { DatabaseSync } from "node:sqlite";
import express from "express";
const port = 8000;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db_path = "./db.sqlite";
const db = new DatabaseSync(db_path);

console.log("Creating database tables");
db.exec(
  `CREATE TABLE IF NOT EXISTS czlonkowie (
    id             INTEGER PRIMARY KEY,
    fname          TEXT NOT NULL,
    lname          TEXT NOT NULL
  ) STRICT;`
);

const insert = db.prepare('INSERT INTO czlonkowie (fname, lname) VALUES (?, ?)');
const update_query = db.prepare('UPDATE czlonkowie SET fname = ?, lname = ? WHERE id = ?');
const remove_query = db.prepare('DELETE FROM czlonkowie WHERE id = ?');


app.get("/", (req, res) => {
  const query = db.prepare('SELECT * FROM czlonkowie ORDER BY id');
  const people = query.all();
  res.render("home", {
    title: "Członkowie klubu:",
    people: people,
    db: db
  });
});

app.get("/form", (req, res) => {
  res.render("form", {
    title: "zapisz się do naszego klubu"
  });
});

app.get("/edit", (req, res) => {
  const query = db.prepare('SELECT * FROM czlonkowie ORDER BY id');
  const people = query.all();
  res.render("edit", {
    title: "Edytuj użytkowników",
    people: people
  });
});

app.post("/form_validation", (req, res) => {
          var name = req.body.name;
          var surname = req.body.surname;
          insert.run(name, surname);
        console.log("added ", req.body.name, req.body.surname);
        res.redirect(`/`);
});
app.post("/edit/values", (req, res) => {
          var name = req.body.fname;
          var surname = req.body.lname;
          var id = Number(req.body.id);
          var update = req.body.update;
          var remove = req.body.delete;
          if(update){
            update_query.run(name, surname, id);
            console.log("updated ", req.body.fname, req.body.lname);
          }
          if(remove){
            remove_query.run(id);
            console.log("removed ", req.body.fname, req.body.lname);
          }
        res.redirect(`/`);
});

app.get("/about", (req, res) =>{
  res.render("about");
});

export function populate(name, surname){
  const insert = 'INSERT INTO czlonkowie (fname, lname) VALUES (?, ?)';
  return insert.run(name, surname);
  console.log("inserted", name, surname);
}

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

export default{
  populate
}

// const deleteById = db.prepare(
//   "DELETE FROM czlonkowie WHERE id = ?"
// );

// app.delete("/delete/:id", (req, res) => {
//   const id = req.params.id;
//   deleteById.run(id);
//   res.json({ success: true });
// });



// const updateById = db.prepare(
//   "UPDATE czlonkowie SET fname = ?, lname = ? WHERE id = ?"
// );

// // app.update("/update/:id", (req, res) => {
// //   const id = req.params.id;
// //   deleteById.run(id);
// //   res.json({ success: true });
// // });

// app.post("/update", (req, res) => {
//   const { id, fname, lname } = req.body;

//   updateById.run(fname, lname, id);
//   res.redirect("/");
// });
