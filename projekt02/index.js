import { name } from "ejs";
import { DatabaseSync } from "node:sqlite";
import express from "express";
const port = 8000;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded());

const db_path = "./db.sqlite";
const db = new DatabaseSync(db_path);

// console.log("Creating database tables");
// db.exec(
//   `CREATE TABLE IF NOT EXISTS czlonkowie (
//     id             INTEGER PRIMARY KEY,
//     fname          TEXT NOT NULL,
//     lname          TEXT NOT NULL
//   ) STRICT;`
// );

const people = [
{
  name: "John",
  surname: "Doe",
}, 
{
  name: "Mateusz",
  surname: "Nowak",
}];

app.get("/", (req, res) => {
  res.render("home", {
    title: "Członkowie klubu:",
    people: people
  });
});

app.get("/form", (req, res) => {
  res.render("form", {
    title: "zapisz się do naszego klubu",
    people: people
  });
});

app.post("/form_validation", (req, res) => {
        addPeople({
          name: req.body.name,
          surname: req.body.surname,
        });
        console.log("added ", req.body.name, req.body.surname);
        res.redirect(`/`);
});

app.get("/about", (req, res) =>{
  res.render("about");
});

function addPeople(person){
  people.push(person);
};

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
